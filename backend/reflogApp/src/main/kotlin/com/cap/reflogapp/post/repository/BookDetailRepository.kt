package com.cap.reflogapp.post.repository

import com.cap.reflogapp.post.entity.BookDetail
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface BookDetailRepository : JpaRepository<BookDetail, Long>
