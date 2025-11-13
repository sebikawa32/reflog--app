package com.cap.reflogapp.follow.entity

import com.cap.reflogapp.user.entity.User
import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
@Table(
    name = "follow",
    uniqueConstraints = [UniqueConstraint(columnNames = ["follower_id", "following_id"])]
)
class Follow(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "follower_id")
    val follower: User,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "following_id")
    val following: User,

    val createdAt: LocalDateTime = LocalDateTime.now()
)
