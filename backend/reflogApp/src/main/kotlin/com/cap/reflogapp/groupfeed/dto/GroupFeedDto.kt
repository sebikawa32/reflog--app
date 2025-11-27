package com.cap.reflogapp.groupfeed.dto

data class GroupFeedDto(
    val id: Long,
    val groupId: Long,
    val creatorId: Long,
    val title: String,
    val category: String,
    val contentInfo: String?,   // meta JSON 그대로 전달
    val introText: String?,     // content
    val thumbnailUrl: String?,  // image_url
    val endDate: String,        // deadline
    val createdAt: String
)
