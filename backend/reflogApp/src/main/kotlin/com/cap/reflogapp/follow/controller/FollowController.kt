package com.cap.reflogapp.follow.controller

import com.cap.reflogapp.follow.service.FollowService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/follow")
class FollowController(
    private val followService: FollowService
) {

    @PostMapping("/{targetId}")
    fun follow(
        @PathVariable targetId: Long,
        @RequestAttribute("userId") userId: Long
    ): ResponseEntity<String> {
        followService.followUser(userId, targetId)
        return ResponseEntity.ok("팔로우 성공")
    }

    @DeleteMapping("/{targetId}")
    fun unfollow(
        @PathVariable targetId: Long,
        @RequestAttribute("userId") userId: Long
    ): ResponseEntity<String> {
        followService.unfollowUser(userId, targetId)
        return ResponseEntity.ok("언팔로우 성공")
    }

    @GetMapping("/followers/{userId}")
    fun getFollowers(@PathVariable userId: Long) =
        ResponseEntity.ok(followService.getFollowers(userId))

    @GetMapping("/followings/{userId}")
    fun getFollowings(@PathVariable userId: Long) =
        ResponseEntity.ok(followService.getFollowings(userId))
}
