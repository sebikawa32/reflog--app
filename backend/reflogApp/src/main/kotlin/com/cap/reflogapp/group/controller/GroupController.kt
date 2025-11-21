package com.cap.reflogapp.group.controller

import com.cap.reflogapp.group.dto.GroupMemberDto
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

    /** ✅ 그룹 생성 + 리더 자동 가입 */
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

    /** ✅ 전체 그룹 조회 */
    @GetMapping
    fun getAllGroups(): ResponseEntity<List<GroupInfo>> {
        return ResponseEntity.ok(groupService.getAllGroups())
    }

    /** ✅ 특정 그룹 상세 조회 */
    @GetMapping("/{groupId}")
    fun getGroup(@PathVariable groupId: Long): ResponseEntity<GroupInfo> {
        return ResponseEntity.ok(groupService.getGroupById(groupId))
    }

    /** ✅ 그룹 가입 요청 (PENDING 생성) */
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

        val dto = GroupMemberDto(
            id = member.id,
            groupId = group.id,
            userId = user.id,
            joinedAt = member.joinedAt.toString()
        )
        return ResponseEntity.ok(dto)
    }

    /** ✅ 리더가 가입 요청 승인 */
    @PostMapping("/members/{memberId}/approve")
    fun approveJoinRequest(
        @PathVariable memberId: Long,
        @RequestBody body: Map<String, String>
    ): ResponseEntity<GroupMember> {

        val leaderId = body["leaderId"]?.toLong()
            ?: throw IllegalArgumentException("leaderId 필요")

        val leader = User(id = leaderId, email = "", password = "", nickname = "")

        val approved = groupService.approveJoinRequest(memberId, leader)
        return ResponseEntity.ok(approved)
    }

    /** ✅ 리더가 가입 요청 거절 */
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

    /** ✅ 승인된 멤버 목록 조회 */
    @GetMapping("/{groupId}/members")
    fun getGroupMembers(@PathVariable groupId: Long): ResponseEntity<List<GroupMemberDto>> {
        val group = groupService.getGroupById(groupId)
        val members = groupService.getMembers(group)
        return ResponseEntity.ok(members)
    }

    /** ✅ 리더가 확인하는 가입 요청 목록(PENDING) */
    @GetMapping("/{groupId}/pending")
    fun getPendingRequests(
        @PathVariable groupId: Long,
        @RequestParam leaderId: Long
    ): ResponseEntity<List<GroupMemberDto>> {

        val group = groupService.getGroupById(groupId)
        val leader = User(id = leaderId, email = "", password = "", nickname = "")
        val requests = groupService.getPendingRequests(group, leader)

        return ResponseEntity.ok(requests)
    }

    /** ✅ 그룹 탈퇴 */
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

    /** ✅ 그룹 삭제 (리더만 가능) */
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

    // =====================================================
    // 🔥 아래는 추가된 기능 (검색 + 내가 가입한 그룹 + 안 한 그룹)
    // =====================================================

    /** ✅ 내가 가입한 그룹 목록 */
    @GetMapping("/my")
    fun getMyGroups(request: HttpServletRequest): ResponseEntity<List<GroupSimpleDto>> {
        val userId = request.getAttribute("userId") as? Long
            ?: throw IllegalArgumentException("userId 없음")

        return ResponseEntity.ok(groupService.getMyGroups(userId))
    }

    /** ✅ 내가 가입하지 않은 그룹 목록 */
    @GetMapping("/not-joined")
    fun getNotJoinedGroups(request: HttpServletRequest): ResponseEntity<List<GroupSimpleDto>> {
        val userId = request.getAttribute("userId") as? Long
            ?: throw IllegalArgumentException("userId 없음")

        return ResponseEntity.ok(groupService.getGroupsNotJoined(userId))
    }

    /** ✅ 키워드 검색 */
    @GetMapping("/search")
    fun searchGroups(@RequestParam keyword: String): ResponseEntity<List<GroupSimpleDto>> {
        val result = groupService.searchGroups(keyword)
        return ResponseEntity.ok(result)
    }
    /** 그룹 정보 수정 (리더만 가능) */
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

        val updated = groupService.updateGroup(groupId, user, groupName, description)

        return ResponseEntity.ok(updated)
    }

}
