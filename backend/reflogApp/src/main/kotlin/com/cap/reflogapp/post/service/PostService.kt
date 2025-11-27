package com.cap.reflogapp.post.service

import com.cap.reflogapp.post.dto.PostRequestDto
import com.cap.reflogapp.post.dto.PostResponseDto
import com.cap.reflogapp.post.entity.*
import com.cap.reflogapp.post.repository.*
import com.fasterxml.jackson.databind.ObjectMapper
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.time.LocalDateTime

@Service
class PostService(
    private val postRepository: PostRepository,
    private val bookRepo: BookDetailRepository,
    private val movieRepo: MovieDetailRepository,
    private val dramaRepo: DramaDetailRepository,
    private val animationRepo: AnimationDetailRepository,
    private val objectMapper: ObjectMapper
) {

    // ✅ 게시글 생성
    @Transactional
    fun createPost(request: PostRequestDto): PostResponseDto {
        val post = postRepository.save(
            Post(
                userId = request.userId,
                title = request.title,
                content = request.content,
                imageUrl = request.imageUrl,
                category = request.category,
                rating = request.rating
            )
        )

        saveDetailByCategory(request.category, request.detail, post.postId)

        val detail = findDetailByCategory(request.category, post.postId)
        return toResponseDto(post, detail)
    }

    // ✅ 게시글 단건 조회
    @Transactional(readOnly = true)
    fun getPostById(postId: Long): PostResponseDto {
        val post = postRepository.findById(postId)
            .orElseThrow { IllegalArgumentException("Post not found with id: $postId") }

        val detail = findDetailByCategory(post.category, post.postId)
        return toResponseDto(post, detail)
    }

    // ✅ 게시글 수정
    @Transactional
    fun updatePost(postId: Long, request: PostRequestDto): PostResponseDto {
        val post = postRepository.findById(postId)
            .orElseThrow { IllegalArgumentException("Post not found with id: $postId") }

        post.apply {
            title = request.title
            content = request.content
            imageUrl = request.imageUrl
            rating = request.rating
            category = request.category
            updatedAt = LocalDateTime.now()
        }

        postRepository.save(post)
        updateDetailByCategory(request.category, request.detail, postId)

        val detail = findDetailByCategory(request.category, postId)
        return toResponseDto(post, detail)
    }

    // ✅ 게시글 삭제
    @Transactional
    fun deletePost(postId: Long) {
        val post = postRepository.findById(postId)
            .orElseThrow { IllegalArgumentException("Post not found with id: $postId") }

        deleteDetailByCategory(post.category, postId)
        postRepository.delete(post)
    }

    // ✅ 전체 게시글 목록 — ⭐ 상세 포함하도록 수정
    @Transactional(readOnly = true)
    fun findAll(): List<PostResponseDto> {
        return postRepository.findAll()
            .map { post ->
                val detail = findDetailByCategory(post.category, post.postId)
                toResponseDto(post, detail)
            }
    }

    // ✅ 카테고리별 게시글 목록 — ⭐ 상세 포함하도록 수정
    @Transactional(readOnly = true)
    fun findByCategory(category: String): List<PostResponseDto> {
        return postRepository.findByCategory(category)
            .map { post ->
                val detail = findDetailByCategory(post.category, post.postId)
                toResponseDto(post, detail)
            }
    }

    // ⭐ 유저별 게시글 목록 — ⭐ 상세 포함하도록 수정
    @Transactional(readOnly = true)
    fun findByUserId(userId: Long): List<PostResponseDto> {
        val posts = postRepository.findByUserId(userId)
        return posts.map { post ->
            val detail = findDetailByCategory(post.category, post.postId)
            toResponseDto(post, detail)
        }
    }

    // ========================================================
    // 내부 헬퍼 메서드
    // ========================================================

    /** 카테고리별 상세 저장 */
    private fun saveDetailByCategory(category: String, detail: Any?, postId: Long) {
        if (detail == null) return
        when (category) {
            "book" -> bookRepo.save(objectMapper.convertValue(detail, BookDetail::class.java).apply { this.postId = postId })
            "movie" -> movieRepo.save(objectMapper.convertValue(detail, MovieDetail::class.java).apply { this.postId = postId })
            "drama" -> dramaRepo.save(objectMapper.convertValue(detail, DramaDetail::class.java).apply { this.postId = postId })
            "animation" -> animationRepo.save(objectMapper.convertValue(detail, AnimationDetail::class.java).apply { this.postId = postId })
        }
    }

    /** 카테고리별 상세 수정 */
    private fun updateDetailByCategory(category: String, detail: Any?, postId: Long) {
        if (detail == null) return
        when (category) {
            "book" -> bookRepo.save(objectMapper.convertValue(detail, BookDetail::class.java).apply { this.postId = postId })
            "movie" -> movieRepo.save(objectMapper.convertValue(detail, MovieDetail::class.java).apply { this.postId = postId })
            "drama" -> dramaRepo.save(objectMapper.convertValue(detail, DramaDetail::class.java).apply { this.postId = postId })
            "animation" -> animationRepo.save(objectMapper.convertValue(detail, AnimationDetail::class.java).apply { this.postId = postId })
        }
    }

    /** 카테고리별 상세 조회 */
    private fun findDetailByCategory(category: String, postId: Long): Any? {
        return when (category) {
            "book" -> bookRepo.findById(postId).orElse(null)
            "movie" -> movieRepo.findById(postId).orElse(null)
            "drama" -> dramaRepo.findById(postId).orElse(null)
            "animation" -> animationRepo.findById(postId).orElse(null)
            else -> null
        }
    }

    /** 카테고리별 상세 삭제 */
    private fun deleteDetailByCategory(category: String, postId: Long) {
        when (category) {
            "book" -> bookRepo.deleteById(postId)
            "movie" -> movieRepo.deleteById(postId)
            "drama" -> dramaRepo.deleteById(postId)
            "animation" -> animationRepo.deleteById(postId)
        }
    }

    /** 공통 DTO 변환 */
    private fun toResponseDto(post: Post, detail: Any?): PostResponseDto {
        return PostResponseDto(
            postId = post.postId,
            title = post.title,
            content = post.content,
            imageUrl = post.imageUrl,
            category = post.category,
            rating = post.rating,
            createdAt = post.createdAt.toString(),
            updatedAt = post.updatedAt.toString(),
            detail = detail
        )
    }
}
