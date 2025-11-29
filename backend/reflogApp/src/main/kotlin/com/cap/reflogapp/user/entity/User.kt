package com.cap.reflogapp.user.entity

import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
@Table(name = "users")
data class User(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    val id: Long = 0,

    @Column(nullable = false, unique = true)
    val email: String,

    @Column(nullable = false)
    val password: String,

    @Column(nullable = false, unique = true)
    val nickname: String,

    @Column(name = "profile_img")
    val profileImg: String? = null,

    @Column(name = "cover_img")
    val coverImg: String? = null,

    val level: Int = 1,
    val exp: Int = 0,

    // 🔸 참고: bio는 현재 사용 안 하는 듯
    val bio: String? = null,

    @Column(name = "created_at")
    val createdAt: LocalDateTime = LocalDateTime.now(),

    // ⭐ 최종적으로 사용할 소개글 필드
    @Column(nullable = true)
    var introduce: String? = null
)
