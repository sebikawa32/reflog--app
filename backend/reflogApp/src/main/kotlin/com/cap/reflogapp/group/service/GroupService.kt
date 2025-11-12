package com.cap.reflogapp.group.service

import com.cap.reflogapp.group.dto.GroupMemberDto
import com.cap.reflogapp.group.entity.GroupInfo
import com.cap.reflogapp.group.entity.GroupMember
import com.cap.reflogapp.group.repository.GroupInfoRepository
import com.cap.reflogapp.group.repository.GroupMemberRepository
import com.cap.reflogapp.user.entity.User
import jakarta.transaction.Transactional
import org.springframework.stereotype.Service

@Service
class GroupService(
    private val groupInfoRepository: GroupInfoRepository,
    private val groupMemberRepository: GroupMemberRepository
) {

    // ✅ 그룹 생성
    @Transactional
    fun createGroup(groupName: String, description: String?, leader: User): GroupInfo {
        val group = GroupInfo(
            groupName = groupName,
            description = description,
            leader = leader
        )
        return groupInfoRepository.save(group)
    }

    // ✅ 모든 그룹 조회 (읽기 전용 트랜잭션 추가)
    @Transactional(Transactional.TxType.SUPPORTS)
    fun getAllGroups(): List<GroupInfo> {
        return groupInfoRepository.findAll()
    }

    // ✅ 특정 그룹 상세 조회 (읽기 전용 트랜잭션 추가)
    @Transactional(Transactional.TxType.SUPPORTS)
    fun getGroupById(groupId: Long): GroupInfo {
        return groupInfoRepository.findById(groupId)
            .orElseThrow { IllegalArgumentException("그룹을 찾을 수 없습니다.") }
    }

    // ✅ 그룹 가입
    @Transactional
    fun joinGroup(group: GroupInfo, user: User): GroupMember {
        if (groupMemberRepository.existsByGroupAndUser(group, user)) {
            throw IllegalStateException("이미 가입된 그룹입니다.")
        }
        val member = GroupMember(group = group, user = user)
        return groupMemberRepository.save(member)
    }

    // ✅ 그룹 탈퇴
    @Transactional
    fun leaveGroup(group: GroupInfo, user: User) {
        val member = groupMemberRepository.findByGroup(group)
            .find { it.user.id == user.id }
            ?: throw IllegalArgumentException("가입된 사용자가 아닙니다.")
        groupMemberRepository.delete(member)
    }

    // ✅ 특정 그룹의 멤버 목록 조회 (읽기 전용)
    @Transactional(Transactional.TxType.SUPPORTS)
    fun getMembers(group: GroupInfo): List<GroupMemberDto> {
        return groupMemberRepository.findByGroup(group)
            .map { member ->
                GroupMemberDto(
                    id = member.id,
                    groupId = member.group.id,
                    userId = member.user.id,
                    joinedAt = member.joinedAt.toString()
                )
            }
    }
}
