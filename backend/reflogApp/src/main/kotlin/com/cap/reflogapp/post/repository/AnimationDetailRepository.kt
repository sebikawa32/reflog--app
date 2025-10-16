package com.cap.reflogapp.post.repository

import com.cap.reflogapp.post.entity.AnimationDetail
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface AnimationDetailRepository : JpaRepository<AnimationDetail, Long>
