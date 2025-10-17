package com.cap.reflogapp.post.entity

import jakarta.persistence.*
import java.time.LocalDate

@Entity
@Table(name = "drama_detail")
class DramaDetail(
    @Id
    @Column(name = "post_id")
    var postId: Long? = null,

    @Column(name = "broadcast_network")
    var broadcastNetwork: String? = null,

    @Column(name = "start_date")
    var startDate: LocalDate? = null,

    @Column(name = "end_date")
    var endDate: LocalDate? = null
)
