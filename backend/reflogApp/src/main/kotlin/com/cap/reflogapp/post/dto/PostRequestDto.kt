package com.cap.reflogapp.post.dto

data class PostRequestDto(
    val userId: Long,
    val title: String,
    val content: String,
    val imageUrl: String?,
    val category: String,
    val rating: Double?,
    val detail: Any? = null // 카테고리별 상세 데이터
)