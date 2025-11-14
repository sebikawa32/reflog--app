package com.cap.reflogapp.group.entity

import com.cap.reflogapp.user.entity.User
import com.fasterxml.jackson.annotation.JsonBackReference
import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
@Table(name = "group_member")
data class GroupMember(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    val id: Long = 0L,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "group_id")
    @JsonBackReference   // ⭐ GroupInfo.members 와 연결 — 무한루프 방지
    val group: GroupInfo,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonIgnoreProperties(value = ["hibernateLazyInitializer", "handler"])
    val user: User,

    @Column(name = "joined_at")
    val joinedAt: LocalDateTime = LocalDateTime.now()
)
