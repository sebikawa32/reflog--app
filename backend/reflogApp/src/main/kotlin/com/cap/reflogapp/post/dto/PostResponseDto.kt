package com.cap.reflogapp.post.dto

import com.cap.reflogapp.post.entity.Post

data class PostResponseDto(
    val postId: Long,
    val title: String,
    val content: String,
    val imageUrl: String?,
    val category: String,
    val rating: Double?,
    val createdAt: String,
    val updatedAt: String,
    val detail: Any? // 책/영화/드라마/애니 상세정보
) {
    companion object {
        fun fromEntity(post: Post, detail: Any? = null): PostResponseDto {
            return PostResponseDto(
                postId = post.postId,
                title = post.title,
                content = post.content,
                imageUrl = post.imageUrl,
                category = post.category,
                rating = post.rating,
                createdAt = post.createdAt.toString(),
                updatedAt = post.updatedAt.toString(),
                detail = detail
            )
        }
    }
}
