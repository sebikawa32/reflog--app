package com.cap.reflogapp.groupfeed.dto

data class GroupFeedCreateRequest(
    val leaderId: Long,
    val groupId: Long,
    val title: String,
    val category: String,
    val contentInfo: String?,   // meta JSON
    val introText: String?,     // content
    val thumbnailUrl: String?,  // image_url
    val endDate: String         // deadline (yyyy-MM-dd)
)
