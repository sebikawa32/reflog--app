package com.cap.reflogapp.post.repository

import com.cap.reflogapp.post.entity.MovieDetail
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface MovieDetailRepository : JpaRepository<MovieDetail, Long>

