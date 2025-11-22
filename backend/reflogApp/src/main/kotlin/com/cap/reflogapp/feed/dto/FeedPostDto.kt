package com.cap.reflogapp.feed.dto

data class FeedPostDto(
    val postId: Long,
    val authorId: Long,
    val authorName: String,
    val authorProfileImage: String?,
    val contentText: String,
    val imageUrl: String?,
    val createdAt: String,
    val likeCount: Int,
    val commentCount: Int
)
