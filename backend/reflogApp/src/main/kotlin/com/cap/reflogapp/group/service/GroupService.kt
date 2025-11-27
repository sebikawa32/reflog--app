package com.cap.reflogapp.group.service


import GroupMemberDto
import com.cap.reflogapp.group.dto.GroupSimpleDto
import com.cap.reflogapp.group.entity.*
import com.cap.reflogapp.group.repository.GroupInfoRepository
import com.cap.reflogapp.group.repository.GroupMemberRepository
import com.cap.reflogapp.user.entity.User
import jakarta.persistence.EntityManager
import jakarta.transaction.Transactional
import org.springframework.stereotype.Service

@Service
class GroupService(
    private val groupInfoRepository: GroupInfoRepository,
    private val groupMemberRepository: GroupMemberRepository,
    private val em: EntityManager
) {

    private fun loadUserProxy(userId: Long): User =
        em.getReference(User::class.java, userId)

    // -----------------------------------------------------
    // 그룹 생성
    // -----------------------------------------------------
    @Transactional
    fun createGroup(groupName: String, description: String?, leader: User): GroupInfo {
        val group = GroupInfo(
            groupName = groupName,
            description = description,
            leader = leader
        )
        val savedGroup = groupInfoRepository.save(group)

        val leaderMember = GroupMember(
            group = savedGroup,
            user = leader,
            status = GroupMemberStatus.APPROVED
        )
        groupMemberRepository.save(leaderMember)

        return savedGroup
    }

    @Transactional(Transactional.TxType.SUPPORTS)
    fun getAllGroups(): List<GroupInfo> =
        groupInfoRepository.findAll()

    @Transactional(Transactional.TxType.SUPPORTS)
    fun getGroupById(groupId: Long): GroupInfo =
        groupInfoRepository.findById(groupId)
            .orElseThrow { IllegalArgumentException("그룹을 찾을 수 없습니다.") }


    // -----------------------------------------------------
    // 가입 요청 (PENDING)
    // -----------------------------------------------------
    @Transactional
    fun requestToJoinGroup(group: GroupInfo, user: User): GroupMember {

        if (groupMemberRepository.existsByGroupAndUser(group, user)) {
            throw IllegalStateException("이미 가입 요청 중이거나 가입된 그룹입니다.")
        }

        val req = GroupMember(
            group = group,
            user = user,
            status = GroupMemberStatus.PENDING
        )
        return groupMemberRepository.save(req)
    }

    // -----------------------------------------------------
    // 가입 승인
    // -----------------------------------------------------
    @Transactional
    fun approveJoinRequest(groupMemberId: Long, leader: User): GroupMember {
        val member = groupMemberRepository.findById(groupMemberId)
            .orElseThrow { IllegalArgumentException("가입 요청을 찾을 수 없습니다.") }

        if (member.group.leader.id != leader.id) {
            throw IllegalAccessException("리더만 승인할 수 있습니다.")
        }

        member.status = GroupMemberStatus.APPROVED
        return groupMemberRepository.save(member)
    }

    // -----------------------------------------------------
    // 가입 거절
    // -----------------------------------------------------
    @Transactional
    fun rejectJoinRequest(groupMemberId: Long, leader: User) {
        val member = groupMemberRepository.findById(groupMemberId)
            .orElseThrow { IllegalArgumentException("가입 요청을 찾을 수 없습니다.") }

        if (member.group.leader.id != leader.id) {
            throw IllegalAccessException("리더만 거절할 수 있습니다.")
        }

        member.status = GroupMemberStatus.REJECTED
        groupMemberRepository.save(member)
    }

    // -----------------------------------------------------
    // 그룹 탈퇴
    // -----------------------------------------------------
    @Transactional
    fun leaveGroup(group: GroupInfo, user: User) {
        val member = groupMemberRepository.findByGroup(group)
            .find { it.user.id == user.id && it.status == GroupMemberStatus.APPROVED }
            ?: throw IllegalArgumentException("가입된 사용자가 아닙니다.")

        groupMemberRepository.delete(member)
    }


    // -----------------------------------------------------
    // 승인 멤버 목록 조회
    // -----------------------------------------------------
    @Transactional(Transactional.TxType.SUPPORTS)
    fun getMembers(group: GroupInfo): List<GroupMemberDto> =
        groupMemberRepository.findByGroupAndStatus(group, GroupMemberStatus.APPROVED)
            .map {
                GroupMemberDto(
                    id = it.id,
                    groupId = it.group.id,
                    userId = it.user.id,
                    nickname = it.user.nickname,
                    joinedAt = it.joinedAt?.toString(),   // ⭐ NULL SAFE
                    status = it.status.name
                )
            }

    // -----------------------------------------------------
    // 리더가 보는 PENDING 멤버 목록
    // -----------------------------------------------------
    @Transactional(Transactional.TxType.SUPPORTS)
    fun getPendingRequests(group: GroupInfo, leader: User): List<GroupMemberDto> {

        if (group.leader.id != leader.id) {
            throw IllegalAccessException("리더만 요청을 볼 수 있습니다.")
        }

        return groupMemberRepository.findByGroupAndStatus(group, GroupMemberStatus.PENDING)
            .map {
                GroupMemberDto(
                    id = it.id,
                    groupId = it.group.id,
                    userId = it.user.id,
                    nickname = it.user.nickname,
                    joinedAt = it.joinedAt?.toString(),  // ⭐ NPE 해결
                    status = it.status.name
                )
            }
    }

    // -----------------------------------------------------
    // 그룹 삭제
    // -----------------------------------------------------
    @Transactional
    fun deleteGroup(groupId: Long, user: User) {
        val group = groupInfoRepository.findById(groupId)
            .orElseThrow { IllegalArgumentException("그룹을 찾을 수 없습니다.") }

        if (group.leader.id != user.id) {
            throw IllegalAccessException("리더만 삭제할 수 있습니다.")
        }

        groupInfoRepository.delete(group)
    }

    // -----------------------------------------------------
    // 내가 가입한 그룹 목록
    // -----------------------------------------------------
    @Transactional(Transactional.TxType.SUPPORTS)
    fun getMyGroups(userId: Long): List<GroupSimpleDto> {

        val user = loadUserProxy(userId)

        return groupMemberRepository.findByUserAndStatus(user, GroupMemberStatus.APPROVED)
            .map {
                val g = it.group
                GroupSimpleDto(
                    id = g.id,
                    groupName = g.groupName,
                    description = g.description ?: "",
                    memberCount = groupMemberRepository.countApprovedMembers(g.id),
                    leaderId = g.leader.id,
                    joinedStatus = "APPROVED"
                )
            }
    }

    // -----------------------------------------------------
    // 가입하지 않은 그룹 목록 (PENDING 포함)
    // -----------------------------------------------------
    @Transactional(Transactional.TxType.SUPPORTS)
    fun getGroupsNotJoined(userId: Long): List<GroupSimpleDto> {

        val user = loadUserProxy(userId)

        val memberships = groupMemberRepository.findByUser(user)

        return groupInfoRepository.findAll()
            .map { g ->
                val membership = memberships.find { it.group.id == g.id }

                val status = when (membership?.status) {
                    GroupMemberStatus.APPROVED -> "APPROVED"
                    GroupMemberStatus.PENDING -> "PENDING"
                    else -> "NONE"
                }

                GroupSimpleDto(
                    id = g.id,
                    groupName = g.groupName,
                    description = g.description ?: "",
                    memberCount = groupMemberRepository.countApprovedMembers(g.id),
                    leaderId = g.leader.id,
                    joinedStatus = status
                )
            }
            .filter { it.joinedStatus != "APPROVED" }
    }

    // -----------------------------------------------------
    // 검색
    // -----------------------------------------------------
    @Transactional(Transactional.TxType.SUPPORTS)
    fun searchGroups(keyword: String): List<GroupSimpleDto> {

        val groups = groupInfoRepository.searchByNameOrDescription(keyword)

        return groups.map { g ->
            GroupSimpleDto(
                id = g.id,
                groupName = g.groupName,
                description = g.description ?: "",
                memberCount = groupMemberRepository.countApprovedMembers(g.id),
                leaderId = g.leader.id,
                joinedStatus = "NONE"
            )
        }
    }

    // -----------------------------------------------------
    // 그룹 수정
    // -----------------------------------------------------
    @Transactional
    fun updateGroup(
        groupId: Long,
        user: User,
        groupName: String?,
        description: String?
    ): GroupInfo {

        val group = groupInfoRepository.findById(groupId)
            .orElseThrow { IllegalArgumentException("그룹을 찾을 수 없습니다.") }

        if (group.leader.id != user.id) {
            throw IllegalAccessException("리더만 수정할 수 있습니다.")
        }

        if (!groupName.isNullOrBlank()) group.groupName = groupName
        if (description != null) group.description = description

        return groupInfoRepository.save(group)
    }
}
