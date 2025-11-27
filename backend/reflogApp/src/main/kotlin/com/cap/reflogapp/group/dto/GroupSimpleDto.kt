package com.cap.reflogapp.group.dto

data class GroupSimpleDto(
    val id: Long,
    val groupName: String,
    val description: String,
    val memberCount: Int,
    val leaderId: Long,
    val joinedStatus: String // "NONE", "PENDING", "APPROVED"
)
