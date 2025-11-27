package com.cap.reflogapp.groupfeed.service

import com.cap.reflogapp.group.entity.GroupInfo
import com.cap.reflogapp.group.repository.GroupInfoRepository
import com.cap.reflogapp.groupfeed.dto.GroupFeedCreateRequest
import com.cap.reflogapp.groupfeed.dto.GroupFeedDto
import com.cap.reflogapp.groupfeed.dto.ReviewCreateRequest
import com.cap.reflogapp.groupfeed.dto.ReviewDto
import com.cap.reflogapp.groupfeed.entity.FeedCategory
import com.cap.reflogapp.groupfeed.entity.GroupFeed
import com.cap.reflogapp.groupfeed.entity.GroupFeedReview
import com.cap.reflogapp.groupfeed.repository.GroupFeedRepository
import com.cap.reflogapp.groupfeed.repository.GroupFeedReviewRepository
import com.cap.reflogapp.user.entity.User
import jakarta.transaction.Transactional
import org.springframework.stereotype.Service
import java.time.LocalDate

@Service
class GroupFeedService(
    private val groupInfoRepository: GroupInfoRepository,
    private val feedRepository: GroupFeedRepository,
    private val reviewRepository: GroupFeedReviewRepository
) {

    /** 🔥 그룹 피드 생성 */
    @Transactional
    fun createFeed(req: GroupFeedCreateRequest): GroupFeedDto {

        val group = groupInfoRepository.findById(req.groupId)
            .orElseThrow { IllegalArgumentException("그룹을 찾을 수 없습니다.") }

        val leader = User(id = req.leaderId, email = "", password = "", nickname = "")

        val feed = GroupFeed(
            group = group,
            creator = leader,
            title = req.title,
            category = FeedCategory.valueOf(req.category),
            contentInfo = req.contentInfo,
            introText = req.introText,
            thumbnailUrl = req.thumbnailUrl,
            endDate = LocalDate.parse(req.endDate)
        )

        return feedRepository.save(feed).toDto()
    }

    /** 🔥 특정 그룹의 모든 피드 조회 */
    @Transactional
    fun getFeeds(groupId: Long): List<GroupFeedDto> {
        val group = groupInfoRepository.findById(groupId)
            .orElseThrow { IllegalArgumentException("그룹을 찾을 수 없습니다.") }

        val feeds = feedRepository.findByGroup(group)

        return feeds.map { it.toDto() }
    }

    /** 🔥 피드 상세 조회 */
    @Transactional
    fun getFeedDetail(feedId: Long): GroupFeedDto {
        val feed = feedRepository.findById(feedId)
            .orElseThrow { IllegalArgumentException("피드를 찾을 수 없습니다.") }

        return feed.toDto()
    }

    /** 🔥 리뷰 생성 (1인 1개 제한) */
    @Transactional
    fun createReview(req: ReviewCreateRequest): ReviewDto {

        val feed = feedRepository.findById(req.feedId)
            .orElseThrow { IllegalArgumentException("피드를 찾을 수 없습니다.") }

        val user = User(id = req.userId, email = "", password = "", nickname = "")

        if (reviewRepository.existsByFeedAndUser(feed, user)) {
            throw IllegalStateException("이미 리뷰를 작성했습니다.")
        }

        val review = GroupFeedReview(
            feed = feed,
            user = user,
            rating = req.rating,
            comment = req.comment
        )

        return reviewRepository.save(review).toReviewDto()
    }

    /** 🔥 리뷰 목록 조회 */
    @Transactional
    fun getReviews(feedId: Long): List<ReviewDto> {
        val feed = feedRepository.findById(feedId)
            .orElseThrow { IllegalArgumentException("피드를 찾을 수 없습니다.") }

        return reviewRepository.findByFeed(feed)
            .map { it.toReviewDto() }
    }

    /** 🔥 유저가 이미 리뷰 작성했는지 체크 */
    @Transactional
    fun hasUserReview(feedId: Long, userId: Long): Boolean {
        val feed = feedRepository.findById(feedId)
            .orElseThrow { IllegalArgumentException("피드를 찾을 수 없습니다.") }

        val user = User(id = userId, email = "", password = "", nickname = "")

        return reviewRepository.existsByFeedAndUser(feed, user)
    }

    /** 🔥 리뷰 수정 */
    @Transactional
    fun updateReview(feedId: Long, userId: Long, rating: Double?, comment: String?): ReviewDto {

        val feed = feedRepository.findById(feedId)
            .orElseThrow { IllegalArgumentException("피드를 찾을 수 없습니다.") }

        val user = User(id = userId, email = "", password = "", nickname = "")

        val review = reviewRepository.findByFeedAndUser(feed, user)
            ?: throw IllegalArgumentException("작성한 리뷰가 없습니다.")

        if (rating != null) review.rating = rating
        if (comment != null) review.comment = comment

        return reviewRepository.save(review).toReviewDto()
    }

    /** 🔥 리뷰 삭제 */
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

/** 🔥 Feed → DTO 변환 */
private fun GroupFeed.toDto(): GroupFeedDto {
    return GroupFeedDto(
        id = this.id,
        groupId = this.group.id,
        creatorId = this.creator.id,
        title = this.title,
        category = this.category.name,
        contentInfo = this.contentInfo,
        introText = this.introText,
        thumbnailUrl = this.thumbnailUrl,
        endDate = this.endDate.toString(),
        createdAt = this.createdAt.toString()
    )
}

/** 🔥 Review → DTO 변환 */
private fun GroupFeedReview.toReviewDto(): ReviewDto {
    return ReviewDto(
        id = this.id,
        feedId = this.feed.id,
        userId = this.user.id,
        userName = this.user.nickname,
        rating = this.rating ?: 0.0,
        comment = this.comment,
        createdAt = this.createdAt.toString()
    )
}
