package com.cap.reflogapp.group.entity

import com.cap.reflogapp.user.entity.User
import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
@Table(name = "group_info")
data class GroupInfo(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    val id: Long = 0L,

    @Column(name = "group_name", nullable = false, length = 100)
    var groupName: String,

    @Column(name = "description")
    var description: String? = null,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "leader_id")
    var leader: User, // FK → users.user_id

    @Column(name = "created_at")
    var createdAt: LocalDateTime = LocalDateTime.now()
)
