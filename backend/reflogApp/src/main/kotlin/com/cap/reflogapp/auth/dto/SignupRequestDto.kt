package com.cap.reflogapp.auth.dto

data class SignupRequestDto(
    val email: String,
    val password: String,
    val nickname: String,
    val profileImg: String? = null,
    val coverImg: String? = null,
    val bio: String? = null
)
