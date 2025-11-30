package com.cap.reflogapp.post.service

import com.cap.reflogapp.post.dto.PostRequestDto
import com.cap.reflogapp.post.dto.PostResponseDto
import com.cap.reflogapp.post.entity.*
import com.cap.reflogapp.post.repository.*
import com.cap.reflogapp.user.repository.UserRepository
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
    private val userRepository: UserRepository,   // 🔥 추가
    private val objectMapper: ObjectMapper
) {

    // =============================
    // 🔶 게시글 생성
    // =============================
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
        val detail = findDetailByCategory(post.category, post.postId)

        val user = userRepository.findById(post.userId)
            .orElseThrow { IllegalArgumentException("User not found") }

        return PostResponseDto.fromEntity(post, user, detail)
    }

    // =============================
    // 🔶 단건 조회
    // =============================
    @Transactional(readOnly = true)
    fun getPostById(postId: Long): PostResponseDto {
        val post = postRepository.findById(postId)
            .orElseThrow { IllegalArgumentException("Post not found") }

        val detail = findDetailByCategory(post.category, post.postId)

        val user = userRepository.findById(post.userId)
            .orElseThrow { IllegalArgumentException("User not found") }

        return PostResponseDto.fromEntity(post, user, detail)
    }

    // =============================
    // 🔶 게시글 수정
    // =============================
    @Transactional
    fun updatePost(postId: Long, request: PostRequestDto): PostResponseDto {
        val post = postRepository.findById(postId)
            .orElseThrow { IllegalArgumentException("Post not found") }

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

        val user = userRepository.findById(post.userId)
            .orElseThrow { IllegalArgumentException("User not found") }

        return PostResponseDto.fromEntity(post, user, detail)
    }

    // =============================
    // 🔶 게시글 삭제
    // =============================
    @Transactional
    fun deletePost(postId: Long) {
        val post = postRepository.findById(postId)
            .orElseThrow { IllegalArgumentException("Post not found") }

        deleteDetailByCategory(post.category, postId)
        postRepository.delete(post)
    }

    // =============================
    // 🔶 전체 조회
    // =============================
    @Transactional(readOnly = true)
    fun findAll(): List<PostResponseDto> {
        return postRepository.findAll().map { post ->
            val detail = findDetailByCategory(post.category, post.postId)

            val user = userRepository.findById(post.userId)
                .orElseThrow { IllegalArgumentException("User not found") }

            PostResponseDto.fromEntity(post, user, detail)
        }
    }

    // =============================
    // 🔶 카테고리 조회
    // =============================
    @Transactional(readOnly = true)
    fun findByCategory(category: String): List<PostResponseDto> {
        return postRepository.findByCategory(category).map { post ->
            val detail = findDetailByCategory(post.category, post.postId)

            val user = userRepository.findById(post.userId)
                .orElseThrow { IllegalArgumentException("User not found") }

            PostResponseDto.fromEntity(post, user, detail)
        }
    }

    // =============================
    // 🔶 유저별 조회
    // =============================
    @Transactional(readOnly = true)
    fun findByUserId(userId: Long): List<PostResponseDto> {
        return postRepository.findByUserId(userId).map { post ->
            val detail = findDetailByCategory(post.category, post.postId)

            val user = userRepository.findById(post.userId)
                .orElseThrow { IllegalArgumentException("User not found") }

            PostResponseDto.fromEntity(post, user, detail)
        }
    }

    // ===========================================================
    // 상세 저장/수정/조회/삭제
    // ===========================================================

    private fun saveDetailByCategory(category: String, detail: Any?, postId: Long) {
        if (detail == null) return
        when (category) {
            "book" -> bookRepo.save(objectMapper.convertValue(detail, BookDetail::class.java).apply { this.postId = postId })
            "movie" -> movieRepo.save(objectMapper.convertValue(detail, MovieDetail::class.java).apply { this.postId = postId })
            "drama" -> dramaRepo.save(objectMapper.convertValue(detail, DramaDetail::class.java).apply { this.postId = postId })
            "animation" -> animationRepo.save(objectMapper.convertValue(detail, AnimationDetail::class.java).apply { this.postId = postId })
        }
    }

    private fun updateDetailByCategory(category: String, detail: Any?, postId: Long) {
        if (detail == null) return
        when (category) {
            "book" -> bookRepo.save(objectMapper.convertValue(detail, BookDetail::class.java).apply { this.postId = postId })
            "movie" -> movieRepo.save(objectMapper.convertValue(detail, MovieDetail::class.java).apply { this.postId = postId })
            "drama" -> dramaRepo.save(objectMapper.convertValue(detail, DramaDetail::class.java).apply { this.postId = postId })
            "animation" -> animationRepo.save(objectMapper.convertValue(detail, AnimationDetail::class.java).apply { this.postId = postId })
        }
    }

    private fun findDetailByCategory(category: String, postId: Long): Any? {
        return when (category) {
            "book" -> bookRepo.findById(postId).orElse(null)
            "movie" -> movieRepo.findById(postId).orElse(null)
            "drama" -> dramaRepo.findById(postId).orElse(null)
            "animation" -> animationRepo.findById(postId).orElse(null)
            else -> null
        }
    }

    private fun deleteDetailByCategory(category: String, postId: Long) {
        when (category) {
            "book" -> bookRepo.deleteById(postId)
            "movie" -> movieRepo.deleteById(postId)
            "drama" -> dramaRepo.deleteById(postId)
            "animation" -> animationRepo.deleteById(postId)
        }
    }
}
