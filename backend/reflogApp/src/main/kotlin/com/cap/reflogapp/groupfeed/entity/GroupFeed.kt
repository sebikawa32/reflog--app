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
    val creator: User,

    @Column(name = "title", nullable = false)
    var title: String,

    @Column(name = "category", nullable = false)
    @Enumerated(EnumType.STRING)
    var category: FeedCategory,

    /** meta JSONB */
    @Column(name = "meta")
    var contentInfo: String? = null,

    /** DB의 content 컬럼 */
    @Column(name = "content")
    var introText: String? = null,

    /** DB의 image_url 컬럼 */
    @Column(name = "image_url")
    var thumbnailUrl: String? = null,

    /** DB의 deadline 컬럼 */
    @Column(name = "deadline", nullable = false)
    var endDate: LocalDate,

    @Column(name = "created_at")
    var createdAt: LocalDate = LocalDate.now()
)
