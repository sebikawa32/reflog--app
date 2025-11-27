package com.cap.reflogapp.group.controller

import GroupMemberDto

import com.cap.reflogapp.group.dto.GroupSimpleDto
import com.cap.reflogapp.group.entity.GroupInfo
import com.cap.reflogapp.group.entity.GroupMember
import com.cap.reflogapp.group.service.GroupService
import com.cap.reflogapp.user.entity.User
import jakarta.servlet.http.HttpServletRequest
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/groups")
class GroupController(
    private val groupService: GroupService
) {

    /** 그룹 생성 */
    @PostMapping("/create")
    fun createGroup(@RequestBody request: Map<String, String>): ResponseEntity<GroupInfo> {
        val groupName = request["groupName"] ?: throw IllegalArgumentException("groupName 필요")
        val description = request["description"]
        val leaderId = request["leaderId"]?.toLong()
            ?: throw IllegalArgumentException("leaderId 필요")

        val leader = User(id = leaderId, email = "", password = "", nickname = "")
        val created = groupService.createGroup(groupName, description, leader)
        return ResponseEntity.ok(created)
    }

    /** 전체 그룹 조회 */
    @GetMapping
    fun getAllGroups(): ResponseEntity<List<GroupInfo>> =
        ResponseEntity.ok(groupService.getAllGroups())

    /** 특정 그룹 상세 조회 */
    @GetMapping("/{groupId}")
    fun getGroup(@PathVariable groupId: Long): ResponseEntity<GroupInfo> =
        ResponseEntity.ok(groupService.getGroupById(groupId))

    /** 가입 요청 */
    @PostMapping("/{groupId}/join-request")
    fun requestJoinGroup(
        @PathVariable groupId: Long,
        @RequestBody body: Map<String, String>
    ): ResponseEntity<GroupMemberDto> {

        val userId = body["userId"]?.toLong()
            ?: throw IllegalArgumentException("userId 필요")

        val group = groupService.getGroupById(groupId)
        val user = User(id = userId, email = "", password = "", nickname = "")

        val member = groupService.requestToJoinGroup(group, user)

        return ResponseEntity.ok(
            GroupMemberDto(
                id = member.id,
                groupId = group.id,
                userId = user.id,
                nickname = user.nickname,     // 추가됨
                joinedAt = member.joinedAt?.toString(),
                status = member.status.name    // 추가됨
            )
        )
    }

    /** 가입 승인 */
    @PostMapping("/members/{memberId}/approve")
    fun approveJoinRequest(
        @PathVariable memberId: Long,
        @RequestBody body: Map<String, String>
    ): ResponseEntity<GroupMember> {

        val leaderId = body["leaderId"]?.toLong()
            ?: throw IllegalArgumentException("leaderId 필요")

        val leader = User(id = leaderId, email = "", password = "", nickname = "")
        return ResponseEntity.ok(groupService.approveJoinRequest(memberId, leader))
    }

    /** 가입 거절 */
    @PostMapping("/members/{memberId}/reject")
    fun rejectJoinRequest(
        @PathVariable memberId: Long,
        @RequestBody body: Map<String, String>
    ): ResponseEntity<String> {

        val leaderId = body["leaderId"]?.toLong()
            ?: throw IllegalArgumentException("leaderId 필요")

        val leader = User(id = leaderId, email = "", password = "", nickname = "")
        groupService.rejectJoinRequest(memberId, leader)

        return ResponseEntity.ok("가입 요청 거절 완료")
    }

    /** 승인된 멤버 목록 */
    @GetMapping("/{groupId}/members")
    fun getGroupMembers(@PathVariable groupId: Long): ResponseEntity<List<GroupMemberDto>> {
        val group = groupService.getGroupById(groupId)
        return ResponseEntity.ok(groupService.getMembers(group))
    }

    /** 리더가 확인하는 PENDING 요청 목록 */
    @GetMapping("/{groupId}/pending")
    fun getPendingRequests(
        @PathVariable groupId: Long,
        @RequestParam leaderId: Long
    ): ResponseEntity<List<GroupMemberDto>> {

        val group = groupService.getGroupById(groupId)
        val leader = User(id = leaderId, email = "", password = "", nickname = "")

        return ResponseEntity.ok(groupService.getPendingRequests(group, leader))
    }

    /** 그룹 탈퇴 */
    @DeleteMapping("/{groupId}/leave")
    fun leaveGroup(
        @PathVariable groupId: Long,
        @RequestBody body: Map<String, String>
    ): ResponseEntity<String> {

        val userId = body["userId"]?.toLong()
            ?: throw IllegalArgumentException("userId 필요")

        val group = groupService.getGroupById(groupId)
        val user = User(id = userId, email = "", password = "", nickname = "")

        groupService.leaveGroup(group, user)
        return ResponseEntity.ok("그룹 탈퇴 완료")
    }

    /** 그룹 삭제 */
    @DeleteMapping("/{groupId}")
    fun deleteGroup(
        @PathVariable groupId: Long,
        @RequestBody body: Map<String, String>
    ): ResponseEntity<String> {

        val userId = body["userId"]?.toLong()
            ?: throw IllegalArgumentException("userId 필요")

        val user = User(id = userId, email = "", password = "", nickname = "")
        groupService.deleteGroup(groupId, user)

        return ResponseEntity.ok("그룹 삭제 완료")
    }

    /** 내가 가입한 그룹 목록 */
    @GetMapping("/my")
    fun getMyGroups(request: HttpServletRequest): ResponseEntity<List<GroupSimpleDto>> {
        val userId = request.getAttribute("userId") as? Long
            ?: throw IllegalArgumentException("userId 없음")
        return ResponseEntity.ok(groupService.getMyGroups(userId))
    }

    /** 내가 가입하지 않은 그룹 목록 */
    @GetMapping("/not-joined")
    fun getNotJoinedGroups(request: HttpServletRequest): ResponseEntity<List<GroupSimpleDto>> {
        val userId = request.getAttribute("userId") as? Long
            ?: throw IllegalArgumentException("userId 없음")
        return ResponseEntity.ok(groupService.getGroupsNotJoined(userId))
    }

    /** 검색 */
    @GetMapping("/search")
    fun searchGroups(
        @RequestParam keyword: String
    ): ResponseEntity<List<GroupSimpleDto>> =
        ResponseEntity.ok(groupService.searchGroups(keyword))

    /** 그룹 수정 */
    @PutMapping("/{groupId}")
    fun updateGroup(
        @PathVariable groupId: Long,
        @RequestBody body: Map<String, String>
    ): ResponseEntity<GroupInfo> {

        val userId = body["userId"]?.toLong()
            ?: throw IllegalArgumentException("userId 필요")

        val groupName = body["groupName"]
        val description = body["description"]

        val user = User(id = userId, email = "", password = "", nickname = "")
        return ResponseEntity.ok(groupService.updateGroup(groupId, user, groupName, description))
    }
}
