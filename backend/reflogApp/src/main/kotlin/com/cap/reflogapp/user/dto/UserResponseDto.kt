package com.cap.reflogapp.user.dto

data class UserResponseDto(
    val id: Long,
    val email: String,
    val nickname: String,
    val profileImg: String?,
    val introduce: String?,
    val followerCount: Int,
    val followingCount: Int,
    val isFollowing: Boolean
)
