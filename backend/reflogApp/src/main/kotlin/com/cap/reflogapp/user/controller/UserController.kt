package com.cap.reflogapp.user.controller

import com.cap.reflogapp.user.dto.UserResponseDto
import com.cap.reflogapp.user.service.UserService
import com.cap.reflogapp.user.dto.SearchUserResponseDto
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/users")
class UserController(
    private val userService: UserService
) {

    @GetMapping("/test")
    fun testAuth(): String {
        val auth = org.springframework.security.core.context.SecurityContextHolder
            .getContext().authentication
        return "인증 성공! 로그인된 사용자: ${auth.name}"
    }

    /** 🔥 특정 유저 프로필 조회 (isFollowing 포함) */
    @GetMapping("/{userId}")
    fun getUserById(
        @PathVariable userId: Long,
        @RequestAttribute("userId") requesterId: Long
    ): UserResponseDto {
        return userService.getUserById(userId, requesterId)
    }

    /** 🔥 내 프로필 조회 */
    @GetMapping("/me")
    fun getMyInfo(): UserResponseDto {
        return userService.getMyInfo()
    }

    /** 🔥 UserResponseDto 그대로 요청 DTO로 재사용 */
    @PutMapping("/me")
    fun updateMyProfile(@RequestBody request: UserResponseDto): UserResponseDto {
        return userService.updateMyProfile(request)
    }

    /** 🔥 소개글 업데이트 */
    @PutMapping("/introduce")
    fun updateIntroduce(
        @RequestAttribute("userId") userId: Long,
        @RequestBody body: Map<String, String>
    ): ResponseEntity<String> {
        userService.updateIntroduce(userId, body["introduce"] ?: "")
        return ResponseEntity.ok("소개글 업데이트 완료")
    }

    /** 🔥 유저 검색 */
    @GetMapping("/search")
    fun searchUsers(
        @RequestParam keyword: String,
        @RequestAttribute("userId") userId: Long
    ): ResponseEntity<List<SearchUserResponseDto>> {
        val result = userService.searchUsers(keyword, userId)
        return ResponseEntity.ok(result)
    }
}
