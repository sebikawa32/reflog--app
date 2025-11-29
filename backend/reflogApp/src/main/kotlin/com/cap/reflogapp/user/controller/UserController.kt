package com.cap.reflogapp.user.controller

import com.cap.reflogapp.user.dto.UserResponseDto
import com.cap.reflogapp.user.service.UserService
import org.springframework.http.ResponseEntity       // ⭐ 추가
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

    @GetMapping("/{userId}")
    fun getUserById(@PathVariable userId: Long): UserResponseDto {
        return userService.getUserById(userId)
    }

    @GetMapping("/me")
    fun getMyInfo(): UserResponseDto {
        return userService.getMyInfo()
    }

    @PutMapping("/introduce")
    fun updateIntroduce(
        @RequestAttribute("userId") userId: Long,
        @RequestBody body: Map<String, String>
    ): ResponseEntity<String> {
        userService.updateIntroduce(userId, body["introduce"] ?: "")
        return ResponseEntity.ok("소개글 업데이트 완료")
    }
}
