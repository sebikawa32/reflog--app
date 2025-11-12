package com.cap.reflogapp.post.repository

import com.cap.reflogapp.post.entity.Post
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface PostRepository : JpaRepository<Post, Long> {
    fun findByCategory(category: String): List<Post>
}

