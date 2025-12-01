package com.cap.reflogapp.feed.dto

data class FeedPostDto(
    val postId: Long,
    val userId: Long,
    val userNickname: String,
    val userProfileImage: String?,
    val title: String?,        // 책/영화 제목
    val rating: Double?,          // 별점
    val content: String?,      // 감상 내용
    val imageUrl: String?,
    val createdAt: String
)
