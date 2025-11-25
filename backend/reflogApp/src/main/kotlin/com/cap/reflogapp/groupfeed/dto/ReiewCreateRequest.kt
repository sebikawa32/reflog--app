package com.cap.reflogapp.groupfeed.dto

data class ReviewCreateRequest(
    val feedId: Long,
    val userId: Long,
    val rating: Double,
    val comment: String?
)
