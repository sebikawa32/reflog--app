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

    @Transactional
    fun createPost(request: PostRequestDto): PostResponseDto {
        // 공통 post 데이터 저장
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

        // 카테고리별 detail 저장
        when (request.category) {
            "book" -> {
                val detailObj = objectMapper.convertValue(request.detail, BookDetail::class.java)
                detailObj.postId = post.postId
                bookRepo.save(detailObj)
            }
            "movie" -> {
                val detailObj = objectMapper.convertValue(request.detail, MovieDetail::class.java)
                detailObj.postId = post.postId
                movieRepo.save(detailObj)
            }
            "drama" -> {
                val detailObj = objectMapper.convertValue(request.detail, DramaDetail::class.java)
                detailObj.postId = post.postId
                dramaRepo.save(detailObj)
            }
            "animation" -> {
                val detailObj = objectMapper.convertValue(request.detail, AnimationDetail::class.java)
                detailObj.postId = post.postId
                animationRepo.save(detailObj)
            }
        }

        // 3️⃣ 응답 DTO로 반환
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
    //Read
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

    //수정
    @Transactional
    fun updatePost(postId: Long, request: PostRequestDto): PostResponseDto {
        // 1️⃣ 기존 게시글 찾기
        val post = postRepository.findById(postId)
            .orElseThrow { IllegalArgumentException("Post not found with id: $postId") }

        // 2️⃣ 기본 정보 업데이트
        post.title = request.title
        post.content = request.content
        post.imageUrl = request.imageUrl
        post.rating = request.rating
        post.category = request.category

        postRepository.save(post)

        // 3️⃣ 카테고리별 상세정보 수정
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

        // 최종 결과 리턴
        return getPostById(postId)
    }

    //삭제
    @Transactional
    fun deletePost(postId: Long) {
        val post = postRepository.findById(postId)
            .orElseThrow { IllegalArgumentException("Post not found with id: $postId") }

        // 카테고리별 상세 데이터 삭제
        when (post.category) {
            "book" -> bookRepo.deleteById(postId)
            "movie" -> movieRepo.deleteById(postId)
            "drama" -> dramaRepo.deleteById(postId)
            "animation" -> animationRepo.deleteById(postId)
        }

        // 메인 게시글 삭제
        postRepository.delete(post)
    }

}
