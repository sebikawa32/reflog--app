package com.cap.reflogapp.auth.entity

import com.cap.reflogapp.user.entity.User
import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
@Table(name = "user_token")
class UserToken(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val tokenId: Long? = null,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    val user: User,

    @Column(nullable = false)
    val refreshToken: String,

    @Column(nullable = false)
    val expiresAt: LocalDateTime,

    @Column(nullable = false)
    val createdAt: LocalDateTime = LocalDateTime.now()
)
