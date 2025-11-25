package com.cap.reflogapp.groupfeed.entity

import com.cap.reflogapp.group.entity.GroupInfo
import com.cap.reflogapp.user.entity.User
import jakarta.persistence.*
import java.time.LocalDate

@Entity
@Table(name = "group_feed")
data class GroupFeed(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    val id: Long = 0L,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "group_id", nullable = false)
    val group: GroupInfo,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "creator_id", nullable = false)
    val creator: User, // 리더

    @Column(name = "title", nullable = false)
    var title: String,

    @Column(name = "category", nullable = false)
    @Enumerated(EnumType.STRING)
    var category: FeedCategory,

    @Column(name = "content_info")
    var contentInfo: String? = null,

    @Column(name = "intro_text")
    var introText: String? = null,

    @Column(name = "thumbnail_url")
    var thumbnailUrl: String? = null,

    @Column(name = "end_date", nullable = false)
    var endDate: LocalDate,

    @Column(name = "created_at")
    var createdAt: LocalDate = LocalDate.now()
)
