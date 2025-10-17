package com.cap.reflogapp.post.entity

import jakarta.persistence.*
import java.time.LocalDate

@Entity
@Table(name = "book_detail")
class BookDetail(

    @Id
    @Column(name = "post_id")
    var postId: Long? = null,  //  var + nullable 로 변경 (외래키 나중에 주입 가능)

    @Column(name = "author")
    var author: String? = null,

    @Column(name = "publisher")
    var publisher: String? = null,

    @Column(name = "read_start_date")
    var readStartDate: LocalDate? = null,

    @Column(name = "read_end_date")
    var readEndDate: LocalDate? = null
)
