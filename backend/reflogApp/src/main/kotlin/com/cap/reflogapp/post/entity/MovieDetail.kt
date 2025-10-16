package com.cap.reflogapp.post.entity

import jakarta.persistence.*
import java.time.LocalDate

@Entity
@Table(name = "movie_detail")
class MovieDetail(
    @Id
    @Column(name = "post_id")
    var postId: Long? = null,

    @Column(name = "director")
    var director: String? = null,

    @Column(name = "release_date")
    var releaseDate: LocalDate? = null,

    @Column(name = "running_time")
    var runningTime: String? = null
)
