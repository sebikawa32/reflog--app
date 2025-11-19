package com.cap.reflogapp.user.dto

data class UserResponseDto(
    val id: Long,
    val email: String,
    val nickname: String,
    val profileImg: String?
)
