package com.cap.reflogapp.group.entity

import com.cap.reflogapp.user.entity.User
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
    val group: GroupInfo,  // FK → group_info.id

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    val user: User,        // FK → users.user_id

    @Column(name = "joined_at")
    val joinedAt: LocalDateTime = LocalDateTime.now()
)
