package com.cap.reflogapp.groupfeed.repository

import com.cap.reflogapp.groupfeed.entity.GroupFeed
import com.cap.reflogapp.groupfeed.entity.GroupFeedReview
import com.cap.reflogapp.user.entity.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface GroupFeedReviewRepository : JpaRepository<GroupFeedReview, Long> {

    fun findByFeed(feed: GroupFeed): List<GroupFeedReview>

    fun existsByFeedAndUser(feed: GroupFeed, user: User): Boolean

    fun findByFeedAndUser(feed: GroupFeed, user: User): GroupFeedReview?
}
