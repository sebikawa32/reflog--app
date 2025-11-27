package com.cap.reflogapp.groupfeed.controller

import com.cap.reflogapp.groupfeed.dto.GroupFeedCreateRequest
import com.cap.reflogapp.groupfeed.dto.GroupFeedDto
import com.cap.reflogapp.groupfeed.dto.ReviewCreateRequest
import com.cap.reflogapp.groupfeed.dto.ReviewDto
import com.cap.reflogapp.groupfeed.service.GroupFeedService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/group-feed")
class GroupFeedController(
    private val feedService: GroupFeedService
) {

    /** 🔥 그룹 피드 생성 */
    @PostMapping("/create")
    fun createFeed(@RequestBody req: GroupFeedCreateRequest):
            ResponseEntity<GroupFeedDto> {

        val result = feedService.createFeed(req)
        return ResponseEntity.ok(result)
    }

    /** 🔥 특정 그룹의 모든 피드 조회 */
    @GetMapping("/{groupId}")
    fun getFeeds(@PathVariable groupId: Long):
            ResponseEntity<List<GroupFeedDto>> {

        val result = feedService.getFeeds(groupId)
        return ResponseEntity.ok(result)
    }

    /** 🔥 피드 상세 조회 */
    @GetMapping("/detail/{feedId}")
    fun getFeedDetail(@PathVariable feedId: Long): ResponseEntity<GroupFeedDto> {
        val result = feedService.getFeedDetail(feedId)
        return ResponseEntity.ok(result)
    }


    /** 🔥 리뷰 생성 */
    @PostMapping("/review/create")
    fun createReview(@RequestBody req: ReviewCreateRequest):
            ResponseEntity<ReviewDto> {

        val result = feedService.createReview(req)
        return ResponseEntity.ok(result)
    }

    /** 🔥 리뷰 조회 */
    @GetMapping("/review/{feedId}")
    fun getReviews(@PathVariable feedId: Long):
            ResponseEntity<List<ReviewDto>> {

        val result = feedService.getReviews(feedId)
        return ResponseEntity.ok(result)
    }
    //그 리뷰 썼나 안썼나 조회
    @GetMapping("/review/check")
    fun checkUserReview(
        @RequestParam feedId: Long,
        @RequestParam userId: Long
    ): ResponseEntity<Boolean> {

        val hasReview = feedService.hasUserReview(feedId, userId)
        return ResponseEntity.ok(hasReview)
    }


    /** 🔥 리뷰 수정 */
    @PutMapping("/review/{feedId}")
    fun updateReview(
        @PathVariable feedId: Long,
        @RequestParam userId: Long,
        @RequestParam rating: Double,
        @RequestParam(required = false) comment: String?
    ): ResponseEntity<ReviewDto> {

        val result = feedService.updateReview(feedId, userId, rating, comment)
        return ResponseEntity.ok(result)
    }

    /** 🔥 리뷰 삭제 */
    @DeleteMapping("/review/{feedId}")
    fun deleteReview(
        @PathVariable feedId: Long,
        @RequestParam userId: Long
    ): ResponseEntity<String> {

        feedService.deleteReview(feedId, userId)
        return ResponseEntity.ok("리뷰 삭제 완료")
    }
}
