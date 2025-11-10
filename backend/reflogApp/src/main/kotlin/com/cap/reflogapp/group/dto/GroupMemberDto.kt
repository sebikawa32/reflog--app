package com.cap.reflogapp.group.dto

data class GroupMemberDto(
    val id: Long,
    val groupId: Long,
    val userId: Long,
    val joinedAt: String
)
