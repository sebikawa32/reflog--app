package com.cap.reflogapp.user.controller

import com.cap.reflogapp.user.dto.UserResponseDto
import com.cap.reflogapp.user.service.UserService
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/users") //  REST 규칙: 복수형으로 통일
class UserController(
    private val userService: UserService
) {

    //  기존 테스트용 엔드포인트 그대로 유지
    @GetMapping("/test")
    fun testAuth(): String {
        val auth = org.springframework.security.core.context.SecurityContextHolder.getContext().authentication
        return "인증 성공! 로그인된 사용자: ${auth.name}"
    }

    //  회원 ID로 조회
    @GetMapping("/{userId}")
    fun getUserById(@PathVariable userId: Long): UserResponseDto {
        return userService.getUserById(userId)
    }

    @GetMapping("/me")
    fun getMyInfo(): UserResponseDto {
        return userService.getMyInfo()
    }
}
