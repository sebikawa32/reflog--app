package com.cap.reflogapp.post.controller

import com.cap.reflogapp.post.dto.PostRequestDto
import com.cap.reflogapp.post.dto.PostResponseDto
import com.cap.reflogapp.post.service.PostService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/posts")
class PostController(
    private val postService: PostService
) {

    /** 🔹 게시글 생성 */
    @PostMapping
    fun createPost(@RequestBody request: PostRequestDto): ResponseEntity<PostResponseDto> {
        val created = postService.createPost(request)
        return ResponseEntity.ok(created)
    }

    /** 🔹 단일 게시글 상세 조회 */
    @GetMapping("/{postId}")
    fun getPostById(@PathVariable postId: Long): PostResponseDto {
        return postService.getPostById(postId)
    }

    /** 🔹 게시글 수정 */
    @PutMapping("/{postId}")
    fun updatePost(
        @PathVariable postId: Long,
        @RequestBody request: PostRequestDto
    ): PostResponseDto {
        return postService.updatePost(postId, request)
    }

    /** 🔹 게시글 삭제 */
    @DeleteMapping("/{postId}")
    fun deletePost(@PathVariable postId: Long): String {
        postService.deletePost(postId)
        return "Post with id $postId has been deleted successfully."
    }

    /**
     * 🔹 게시글 목록 조회
     * - /api/posts?userId=3  → 해당 유저 게시글만
     * - /api/posts?category=book  → 해당 카테고리 게시글만
     * - /api/posts  → 전체 게시글
     */
    @GetMapping
    fun getPosts(
        @RequestParam(required = false) userId: Long?,
        @RequestParam(required = false) category: String?
    ): ResponseEntity<List<PostResponseDto>> {

        val posts = when {
            userId != null -> postService.findByUserId(userId)
            category != null -> postService.findByCategory(category)
            else -> postService.findAll()
        }

        return ResponseEntity.ok(posts)
    }
}
