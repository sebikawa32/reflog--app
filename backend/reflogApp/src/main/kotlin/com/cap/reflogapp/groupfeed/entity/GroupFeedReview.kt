package com.cap.reflogapp.groupfeed.entity

import com.cap.reflogapp.user.entity.User
import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
@Table(
    name = "group_feed_review",
    uniqueConstraints = [
        UniqueConstraint(
            name = "unique_user_feed_review",
            columnNames = ["feed_id", "user_id"]
        )
    ]
)
data class GroupFeedReview(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    val id: Long = 0L,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "feed_id", nullable = false)
    val feed: GroupFeed,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    val user: User,

    @Column(name = "rating")
    var rating: Double? = null,

    @Column(name = "comment", length = 500)
    var comment: String? = null,

    @Column(name = "created_at")
    var createdAt: LocalDateTime = LocalDateTime.now()
)
