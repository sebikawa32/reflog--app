package com.cap.reflogapp.group.controller

import com.cap.reflogapp.group.dto.GroupMemberDto
import com.cap.reflogapp.group.entity.GroupInfo
import com.cap.reflogapp.group.service.GroupService
import com.cap.reflogapp.user.entity.User
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/groups")
class GroupController(
    private val groupService: GroupService
) {

    // ✅ 그룹 생성
    @PostMapping("/create")
    fun createGroup(@RequestBody request: Map<String, String>): ResponseEntity<GroupInfo> {
        val groupName = request["groupName"] ?: throw IllegalArgumentException("groupName 필요")
        val description = request["description"]
        val leader = User(id = request["leaderId"]?.toLong() ?: 1L, email = "", password = "", nickname = "") // ✅ 수정
        val created = groupService.createGroup(groupName, description, leader)
        return ResponseEntity.ok(created)
    }

    // ✅ 전체 그룹 조회
    @GetMapping
    fun getAllGroups(): ResponseEntity<List<GroupInfo>> {
        return ResponseEntity.ok(groupService.getAllGroups())
    }

    // ✅ 특정 그룹 상세 조회
    @GetMapping("/{groupId}")
    fun getGroup(@PathVariable groupId: Long): ResponseEntity<GroupInfo> {
        return ResponseEntity.ok(groupService.getGroupById(groupId))
    }

    // ✅ 그룹 가입
    @PostMapping("/{groupId}/join")
    fun joinGroup(
        @PathVariable groupId: Long,
        @RequestBody body: Map<String, String>
    ): ResponseEntity<GroupMemberDto> {
        val group = groupService.getGroupById(groupId)
        val user = User(id = body["userId"]?.toLong() ?: 1L, email = "", password = "", nickname = "") // ✅ 수정
        val member = groupService.joinGroup(group, user)
        val dto = GroupMemberDto(
            id = member.id,
            groupId = group.id,
            userId = user.id, // ✅ 수정
            joinedAt = member.joinedAt.toString()
        )
        return ResponseEntity.ok(dto)
    }

    // ✅ 그룹 탈퇴
    @DeleteMapping("/{groupId}/leave")
    fun leaveGroup(
        @PathVariable groupId: Long,
        @RequestBody body: Map<String, String>
    ): ResponseEntity<String> {
        val group = groupService.getGroupById(groupId)
        val user = User(id = body["userId"]?.toLong() ?: 1L, email = "", password = "", nickname = "") // ✅ 수정
        groupService.leaveGroup(group, user)
        return ResponseEntity.ok("그룹 탈퇴 완료")
    }
}
