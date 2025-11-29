package com.cap.reflogapp.follow.controller

import com.cap.reflogapp.follow.service.FollowService
import com.cap.reflogapp.user.dto.UserSimpleDto
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/follow")
class FollowController(
    private val followService: FollowService
) {

    /** 🔥 팔로우 */
    @PostMapping("/{targetId}")
    fun follow(
        @PathVariable targetId: Long,
        @RequestAttribute("userId") userId: Long
    ): ResponseEntity<String> {
        followService.followUser(userId, targetId)
        return ResponseEntity.ok("팔로우 성공")
    }

    /** 🔥 언팔로우 */
    @DeleteMapping("/{targetId}")
    fun unfollow(
        @PathVariable targetId: Long,
        @RequestAttribute("userId") userId: Long
    ): ResponseEntity<String> {
        followService.unfollowUser(userId, targetId)
        return ResponseEntity.ok("언팔로우 성공")
    }

    /** 🔥 팔로워 목록 조회 (userId를 팔로우하는 사람들) */
    @GetMapping("/{userId}/followers")
    fun getFollowers(
        @PathVariable userId: Long
    ): ResponseEntity<List<UserSimpleDto>> {
        return ResponseEntity.ok(followService.getFollowers(userId))
    }

    /** 🔥 팔로잉 목록 조회 (userId가 팔로우하는 사람들) */
    @GetMapping("/{userId}/followings")
    fun getFollowings(
        @PathVariable userId: Long
    ): ResponseEntity<List<UserSimpleDto>> {
        return ResponseEntity.ok(followService.getFollowings(userId))
    }
}
