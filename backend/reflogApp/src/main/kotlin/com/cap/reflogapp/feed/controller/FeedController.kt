package com.cap.reflogapp.feed.controller

import com.cap.reflogapp.feed.dto.FeedPostDto
import com.cap.reflogapp.feed.service.FeedService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/feed")
class FeedController(
    private val feedService: FeedService
) {

    @GetMapping("/following")
    fun getFollowingFeed(
        @RequestAttribute("userId") userId: Long?
    ): ResponseEntity<List<FeedPostDto>> {

        println("🔥 [FeedController] userId = $userId")

        if (userId == null) {
            println("❌ userId가 null입니다. JWT 필터에서 userId가 설정되지 않았습니다.")
            return ResponseEntity.ok(emptyList())
        }

        val feed = feedService.getFollowingFeed(userId)
        return ResponseEntity.ok(feed)
    }
}
