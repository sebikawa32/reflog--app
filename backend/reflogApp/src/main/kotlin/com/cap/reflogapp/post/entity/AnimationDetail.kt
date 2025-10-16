package com.cap.reflogapp.post.entity

import jakarta.persistence.*
import java.time.LocalDate

@Entity
@Table(name = "animation_detail")
class AnimationDetail(
    @Id
    @Column(name = "post_id")
    var postId: Long? = null,

    @Column(name = "studio")
    var studio: String? = null,

    @Column(name = "episodes")
    var episodes: Int? = null,

    @Column(name = "release_date")
    var releaseDate: LocalDate? = null
)
