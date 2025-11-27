package com.cap.reflogapp.groupfeed.dto

data class ReviewDto(
    val id: Long,
    val feedId: Long,
    val userId: Long,
    val userName: String,
    val rating: Double,
    val comment: String?,
    val createdAt: String
)
