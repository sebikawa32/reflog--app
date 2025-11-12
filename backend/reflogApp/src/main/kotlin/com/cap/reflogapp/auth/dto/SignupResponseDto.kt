package com.cap.reflogapp.auth.dto

data class SignupResponseDto(
    val userId: Long,
    val email: String,
    val nickname: String,
    val profileImg: String?,
    val coverImg: String?,
    val level: Int,
    val exp: Int,
    val bio: String?,
    val createdAt: String
)
