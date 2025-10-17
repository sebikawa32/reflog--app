package com.cap.reflogapp.post.dto

data class PostResponseDto(
    val postId: Long,
    val title: String,
    val content: String,
    val imageUrl: String?,
    val category: String,
    val rating: Double?,
    val createdAt: String,
    val updatedAt: String,
    val detail: Any?
)