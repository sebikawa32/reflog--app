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

    /** 그룹 (N:1) */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "group_id")
    @JsonBackReference // GroupInfo.members 와 연결 — 무한 루프 방지
    val group: GroupInfo,

    /** 사용자 (N:1) */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonIgnoreProperties(value = ["hibernateLazyInitializer", "handler"])
    val user: User,

    /** 가입 요청 상태 (PENDING / APPROVED / REJECTED) */
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    var status: GroupMemberStatus = GroupMemberStatus.PENDING, // 기본값 대기중

    /** 가입 요청 또는 승인 시각 */
    @Column(name = "joined_at")
    val joinedAt: LocalDateTime = LocalDateTime.now()
)
