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

    @PostMapping
    fun createPost(@RequestBody request: PostRequestDto): ResponseEntity<PostResponseDto> {
        val created = postService.createPost(request)
        return ResponseEntity.ok(created)
    }

    @GetMapping("/{postId}")
    fun getPostById(@PathVariable postId: Long): PostResponseDto {
        return postService.getPostById(postId)
    }

    @PutMapping("/{postId}")
    fun updatePost(@PathVariable postId: Long, @RequestBody request: PostRequestDto): PostResponseDto {
        return postService.updatePost(postId, request)
    }

    @DeleteMapping("/{postId}")
    fun deletePost(@PathVariable postId: Long): String {
        postService.deletePost(postId)
        return "Post with id $postId has been deleted successfully."
    }

}