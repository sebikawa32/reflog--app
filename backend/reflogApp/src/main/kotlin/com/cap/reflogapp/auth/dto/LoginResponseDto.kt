package com.cap.reflogapp.auth.dto

data class LoginResponseDto(
    val accessToken: String,
    val refreshToken: String,
    val user: SimpleUserDto
)

data class SimpleUserDto(
    val userId: Long,
    val email: String,
    val nickname: String
)
