package com.cap.reflogapp.post.entity

import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
@Table(name = "post")
class Post(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_id")
    val postId: Long = 0,

    @Column(nullable = false)
    val userId: Long,

    @Column(nullable = false, length = 100)
    var title: String,

    @Column(columnDefinition = "TEXT", nullable = false)
    var content: String,

    @Column(columnDefinition = "TEXT")
    var imageUrl: String? = null,

    @Column(nullable = false)
    var category: String, // "book", "movie", "drama", "animation"

    @Column
    var rating: Double? = null,

    @Column(name = "created_at")
    val createdAt: LocalDateTime = LocalDateTime.now(),

    @Column(name = "updated_at")
    var updatedAt: LocalDateTime = LocalDateTime.now()
)