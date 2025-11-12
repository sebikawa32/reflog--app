package com.cap.reflogapp.post.service

import com.cap.reflogapp.post.dto.PostRequestDto
import com.cap.reflogapp.post.dto.PostResponseDto
import com.cap.reflogapp.post.entity.*
import com.cap.reflogapp.post.repository.*
import com.fasterxml.jackson.databind.ObjectMapper
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

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

        // 카테고리별 상세 저장
        when (request.category) {
            "book" -> {
                val detail = objectMapper.convertValue(request.detail, BookDetail::class.java)
                detail.postId = post.postId
                bookRepo.save(detail)
            }
            "movie" -> {
                val detail = objectMapper.convertValue(request.detail, MovieDetail::class.java)
                detail.postId = post.postId
                movieRepo.save(detail)
            }
            "drama" -> {
                val detail = objectMapper.convertValue(request.detail, DramaDetail::class.java)
                detail.postId = post.postId
                dramaRepo.save(detail)
            }
            "animation" -> {
                val detail = objectMapper.convertValue(request.detail, AnimationDetail::class.java)
                detail.postId = post.postId
                animationRepo.save(detail)
            }
        }

        return PostResponseDto(
            postId = post.postId,
            title = post.title,
            content = post.content,
            imageUrl = post.imageUrl,
            category = post.category,
            rating = post.rating,
            createdAt = post.createdAt.toString(),
            updatedAt = post.updatedAt.toString(),
            detail = request.detail
        )
    }

    // ✅ 게시글 단건 조회
    @Transactional(readOnly = true)
    fun getPostById(postId: Long): PostResponseDto {
        val post = postRepository.findById(postId)
            .orElseThrow { IllegalArgumentException("Post not found with id: $postId") }

        val detail: Any? = when (post.category) {
            "book" -> bookRepo.findById(post.postId).orElse(null)
            "movie" -> movieRepo.findById(post.postId).orElse(null)
            "drama" -> dramaRepo.findById(post.postId).orElse(null)
            "animation" -> animationRepo.findById(post.postId).orElse(null)
            else -> null
        }

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

    // ✅ 게시글 수정
    @Transactional
    fun updatePost(postId: Long, request: PostRequestDto): PostResponseDto {
        val post = postRepository.findById(postId)
            .orElseThrow { IllegalArgumentException("Post not found with id: $postId") }

        post.title = request.title
        post.content = request.content
        post.imageUrl = request.imageUrl
        post.rating = request.rating
        post.category = request.category

        postRepository.save(post)

        // 카테고리별 상세정보 수정
        when (request.category) {
            "book" -> {
                val existing = bookRepo.findById(postId).orElse(null)
                val updated = objectMapper.convertValue(request.detail, BookDetail::class.java)
                if (existing != null) {
                    existing.author = updated.author
                    existing.publisher = updated.publisher
                    existing.readStartDate = updated.readStartDate
                    existing.readEndDate = updated.readEndDate
                    bookRepo.save(existing)
                } else {
                    updated.postId = postId
                    bookRepo.save(updated)
                }
            }
            "movie" -> {
                val existing = movieRepo.findById(postId).orElse(null)
                val updated = objectMapper.convertValue(request.detail, MovieDetail::class.java)
                if (existing != null) {
                    existing.director = updated.director
                    existing.releaseDate = updated.releaseDate
                    existing.runningTime = updated.runningTime
                    movieRepo.save(existing)
                } else {
                    updated.postId = postId
                    movieRepo.save(updated)
                }
            }
            "drama" -> {
                val existing = dramaRepo.findById(postId).orElse(null)
                val updated = objectMapper.convertValue(request.detail, DramaDetail::class.java)
                if (existing != null) {
                    existing.broadcastNetwork = updated.broadcastNetwork
                    existing.startDate = updated.startDate
                    existing.endDate = updated.endDate
                    dramaRepo.save(existing)
                } else {
                    updated.postId = postId
                    dramaRepo.save(updated)
                }
            }
            "animation" -> {
                val existing = animationRepo.findById(postId).orElse(null)
                val updated = objectMapper.convertValue(request.detail, AnimationDetail::class.java)
                if (existing != null) {
                    existing.studio = updated.studio
                    existing.episodes = updated.episodes
                    existing.releaseDate = updated.releaseDate
                    animationRepo.save(existing)
                } else {
                    updated.postId = postId
                    animationRepo.save(updated)
                }
            }
        }

        return getPostById(postId)
    }

    // ✅ 게시글 삭제
    @Transactional
    fun deletePost(postId: Long) {
        val post = postRepository.findById(postId)
            .orElseThrow { IllegalArgumentException("Post not found with id: $postId") }

        when (post.category) {
            "book" -> bookRepo.deleteById(postId)
            "movie" -> movieRepo.deleteById(postId)
            "drama" -> dramaRepo.deleteById(postId)
            "animation" -> animationRepo.deleteById(postId)
        }

        postRepository.delete(post)
    }

    // ✅ 전체 게시글 목록
    @Transactional(readOnly = true)
    fun findAll(): List<PostResponseDto> {
        return postRepository.findAll()
            .map {
                PostResponseDto(
                    postId = it.postId,
                    title = it.title,
                    content = it.content,
                    imageUrl = it.imageUrl,
                    category = it.category,
                    rating = it.rating,
                    createdAt = it.createdAt.toString(),
                    updatedAt = it.updatedAt.toString(),
                    detail = null // 목록에서는 상세 생략
                )
            }
    }

    // ✅ 카테고리별 게시글 목록
    @Transactional(readOnly = true)
    fun findByCategory(category: String): List<PostResponseDto> {
        return postRepository.findByCategory(category)
            .map {
                PostResponseDto(
                    postId = it.postId,
                    title = it.title,
                    content = it.content,
                    imageUrl = it.imageUrl,
                    category = it.category,
                    rating = it.rating,
                    createdAt = it.createdAt.toString(),
                    updatedAt = it.updatedAt.toString(),
                    detail = null
                )
            }
    }
}
