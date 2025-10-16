package com.cap.reflogapp.post.repository

import com.cap.reflogapp.post.entity.DramaDetail
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface DramaDetailRepository : JpaRepository<DramaDetail, Long>
