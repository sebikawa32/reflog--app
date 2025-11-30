package com.cap.reflogapp.user.dto

data class SearchUserResponseDto(
    val userId: Long,
    val nickname: String,
    val avatarUrl: String?,
    val isFollowing: Boolean
)
