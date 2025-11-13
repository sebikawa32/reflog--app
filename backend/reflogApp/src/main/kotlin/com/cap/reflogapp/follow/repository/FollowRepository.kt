package com.cap.reflogapp.follow.repository

import com.cap.reflogapp.follow.entity.Follow
import com.cap.reflogapp.user.entity.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query

interface FollowRepository : JpaRepository<Follow, Long> {
    fun existsByFollowerIdAndFollowingId(followerId: Long, followingId: Long): Boolean
    fun deleteByFollowerIdAndFollowingId(followerId: Long, followingId: Long)

    @Query("SELECT f.follower FROM Follow f WHERE f.following.id = :userId")
    fun findFollowersByUserId(userId: Long): List<User>

    @Query("SELECT f.following FROM Follow f WHERE f.follower.id = :userId")
    fun findFollowingsByUserId(userId: Long): List<User>
}
