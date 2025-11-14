package com.cap.reflogapp.group.entity

import com.cap.reflogapp.user.entity.User
import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import com.fasterxml.jackson.annotation.JsonManagedReference
import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
@Table(name = "group_info")
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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "leader_id")
    @JsonIgnoreProperties(value = ["hibernateLazyInitializer", "handler"])
    var leader: User,

    @Column(name = "created_at")
    var createdAt: LocalDateTime = LocalDateTime.now(),

    // ⭐ 추가된 부분: 그룹 멤버 목록
    @OneToMany(mappedBy = "group", cascade = [CascadeType.ALL], fetch = FetchType.LAZY, orphanRemoval = true)
    @JsonManagedReference
    var members: MutableList<GroupMember> = mutableListOf()
)
