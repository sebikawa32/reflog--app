package com.cap.reflogapp.auth.controller

import com.cap.reflogapp.auth.dto.*
import com.cap.reflogapp.auth.service.AuthService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/auth")
class AuthController(
    private val authService: AuthService
) {

    /** 회원가입 **/
    @PostMapping("/signup")
    fun signup(@RequestBody request: SignupRequestDto): ResponseEntity<SignupResponseDto> {
        val response = authService.signup(request)
        return ResponseEntity.ok(response)
    }

    /** 로그인 **/
    @PostMapping("/login")
    fun login(@RequestBody request: LoginRequestDto): ResponseEntity<LoginResponseDto> {
        val response = authService.login(request)
        return ResponseEntity.ok(response)
    }

    /** Access Token 재발급 **/
    @PostMapping("/refresh")
    fun refresh(@RequestBody body: Map<String, String>): ResponseEntity<Any> {
        val refreshToken = body["refreshToken"]
            ?: return ResponseEntity.badRequest().body(mapOf("error" to "refreshToken is required"))

        val newAccessToken = authService.refreshAccessToken(refreshToken)
            ?: return ResponseEntity.status(401).body(mapOf("error" to "Invalid or expired refresh token"))

        return ResponseEntity.ok(mapOf("accessToken" to newAccessToken))
    }

    /** ✅ 로그아웃 (Access Token 없이 Refresh Token만으로 수행) **/
    @PostMapping("/logout")
    fun logout(@RequestBody body: Map<String, String>): ResponseEntity<String> {
        val refreshToken = body["refreshToken"]
            ?: return ResponseEntity.badRequest().body("Refresh token is required")

        authService.logout(refreshToken)
        return ResponseEntity.ok("로그아웃 완료")
    }
}
