package com.cap.reflogapp.groupfeed.controller

import com.cap.reflogapp.groupfeed.dto.ReviewCreateRequest
import com.cap.reflogapp.groupfeed.dto.ReviewDto
import com.cap.reflogapp.groupfeed.service.GroupFeedReviewService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/group-feed/review")
class GroupFeedReviewController(
    private val reviewService: GroupFeedReviewService
) {

    /** 리뷰 생성 */
    @PostMapping("/create")
    fun createReview(@RequestBody request: ReviewCreateRequest):
            ResponseEntity<ReviewDto> {

        val result = reviewService.createReview(request)
        return ResponseEntity.ok(result)
    }

    /** 피드의 모든 리뷰 조회 */
    @GetMapping("/{feedId}")
    fun getReviews(@PathVariable feedId: Long):
            ResponseEntity<List<ReviewDto>> {

        val result = reviewService.getReviewsByFeed(feedId)
        return ResponseEntity.ok(result)
    }

    /** 리뷰 수정 */
    @PutMapping("/{feedId}")
    fun updateReview(
        @PathVariable feedId: Long,
        @RequestParam userId: Long,
        @RequestParam rating: Double,
        @RequestParam(required = false) comment: String?
    ): ResponseEntity<ReviewDto> {

        val result = reviewService.updateReview(feedId, userId, rating, comment)
        return ResponseEntity.ok(result)
    }

    /** 리뷰 삭제 */
    @DeleteMapping("/{feedId}")
    fun deleteReview(
        @PathVariable feedId: Long,
        @RequestParam userId: Long
    ): ResponseEntity<String> {

        reviewService.deleteReview(feedId, userId)
        return ResponseEntity.ok("리뷰 삭제 완료")
    }
}
