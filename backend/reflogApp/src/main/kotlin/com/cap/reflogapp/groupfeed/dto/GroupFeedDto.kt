package com.cap.reflogapp.groupfeed.dto

data class GroupFeedDto(
    val id: Long,
    val groupId: Long,
    val creatorId: Long,
    val title: String,
    val category: String,
    val contentInfo: String?,
    val introText: String?,
    val thumbnailUrl: String?,
    val endDate: String,
    val createdAt: String
)
