package com.cap.reflogapp.groupfeed.dto

data class GroupFeedCreateRequest(
    val leaderId: Long,
    val groupId: Long,
    val title: String,
    val category: String,
    val contentInfo: String?,   // (책 정보, 영상 정보 등)
    val introText: String?,     // (한줄 소개)
    val thumbnailUrl: String?,  // 첨부 이미지 URL
    val endDate: String         // yyyy-MM-dd (목표 날짜)
)
