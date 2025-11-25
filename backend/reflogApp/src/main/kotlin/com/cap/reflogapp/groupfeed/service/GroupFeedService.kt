package com.cap.reflogapp.groupfeed.service

import com.cap.reflogapp.groupfeed.dto.ReviewCreateRequest
import com.cap.reflogapp.groupfeed.dto.ReviewDto
import com.cap.reflogapp.groupfeed.entity.GroupFeedReview
import com.cap.reflogapp.groupfeed.repository.GroupFeedRepository
import com.cap.reflogapp.groupfeed.repository.GroupFeedReviewRepository
import com.cap.reflogapp.user.entity.User
import jakarta.transaction.Transactional
import org.springframework.stereotype.Service

@Service
class GroupFeedReviewService(
    private val reviewRepository: GroupFeedReviewRepository,
    private val feedRepository: GroupFeedRepository
) {

    /** 리뷰 생성 */
    @Transactional
    fun createReview(request: ReviewCreateRequest): ReviewDto {

        val feed = feedRepository.findById(request.feedId)
            .orElseThrow { IllegalArgumentException("피드를 찾을 수 없습니다.") }

        val user = User(id = request.userId, email = "", password = "", nickname = "")

        if (reviewRepository.existsByFeedAndUser(feed, user)) {
            throw IllegalStateException("이미 리뷰를 작성했습니다.")
        }

        val review = GroupFeedReview(
            feed = feed,
            user = user,
            rating = request.rating,
            comment = request.comment
        )

        val saved = reviewRepository.save(review)
        return saved.toDto()
    }


    /** 리뷰 목록 조회 */
    @Transactional
    fun getReviewsByFeed(feedId: Long): List<ReviewDto> {
        val feed = feedRepository.findById(feedId)
            .orElseThrow { IllegalArgumentException("피드를 찾을 수 없습니다.") }

        return reviewRepository.findByFeed(feed)
            .map { it.toDto() }
    }


    /** 리뷰 수정 (본인만 가능) */
    @Transactional
    fun updateReview(feedId: Long, userId: Long, rating: Double?, comment: String?): ReviewDto {

        val feed = feedRepository.findById(feedId)
            .orElseThrow { IllegalArgumentException("피드를 찾을 수 없습니다.") }

        val user = User(id = userId, email = "", password = "", nickname = "")

        val review = reviewRepository.findByFeedAndUser(feed, user)
            ?: throw IllegalArgumentException("작성한 리뷰가 없습니다.")

        // 기존 엔티티 수정 (생성일, feed, user는 그대로 유지)
        review.rating = rating
        review.comment = comment

        return reviewRepository.save(review).toDto()
    }


    /** 리뷰 삭제 (본인만 가능) */
    @Transactional
    fun deleteReview(feedId: Long, userId: Long) {

        val feed = feedRepository.findById(feedId)
            .orElseThrow { IllegalArgumentException("피드를 찾을 수 없습니다.") }

        val user = User(id = userId, email = "", password = "", nickname = "")

        val review = reviewRepository.findByFeedAndUser(feed, user)
            ?: throw IllegalArgumentException("작성한 리뷰가 없습니다.")

        reviewRepository.delete(review)
    }
}


/** DTO 변환 */
private fun GroupFeedReview.toDto(): ReviewDto {
    return ReviewDto(
        id = this.id,
        feedId = this.feed.id,
        userId = this.user.id,
        rating = this.rating ?: 0.0,
        comment = this.comment,
        createdAt = this.createdAt.toString()
    )
}
