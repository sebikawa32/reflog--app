package com.cap.reflogapp.post.repository

import com.cap.reflogapp.post.entity.Post
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface PostRepository : JpaRepository<Post, Long> {

    // 기존 함수
    fun findByCategory(category: String): List<Post>

    // 피드 기능: 여러 userId의 게시글을 최신순 조회
    fun findByUserIdInOrderByCreatedAtDesc(userIds: List<Long>): List<Post>
}
