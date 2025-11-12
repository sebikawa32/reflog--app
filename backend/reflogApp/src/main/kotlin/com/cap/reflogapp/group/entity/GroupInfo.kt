package com.cap.reflogapp.group.entity

import com.cap.reflogapp.user.entity.User
import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
@Table(name = "group_info")
// ✅ Hibernate Lazy 로딩 프록시 직렬화 오류 방지
@JsonIgnoreProperties(value = ["hibernateLazyInitializer", "handler"])
data class GroupInfo(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    val id: Long = 0L,

    @Column(name = "group_name", nullable = false, length = 100)
    var groupName: String,

    @Column(name = "description")
    var description: String? = null,

    // ✅ Lazy 로딩된 User 엔티티 직렬화 오류 방지
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "leader_id")
    @JsonIgnoreProperties(value = ["hibernateLazyInitializer", "handler"])
    var leader: User, // FK → users.user_id

    @Column(name = "created_at")
    var createdAt: LocalDateTime = LocalDateTime.now()
)
