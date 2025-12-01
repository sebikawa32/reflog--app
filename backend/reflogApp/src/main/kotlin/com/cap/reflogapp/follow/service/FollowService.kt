package com.cap.reflogapp.follow.service

import com.cap.reflogapp.follow.entity.Follow
import com.cap.reflogapp.follow.repository.FollowRepository
import com.cap.reflogapp.user.dto.UserSimpleDto
import com.cap.reflogapp.user.repository.UserRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class FollowService(
    private val followRepository: FollowRepository,
    private val userRepository: UserRepository
) {

    /** 🔥 팔로우 */
    @Transactional
    fun followUser(followerId: Long, followingId: Long) {
        if (followerId == followingId) throw IllegalArgumentException("자기 자신은 팔로우할 수 없습니다.")
        if (followRepository.existsByFollowerIdAndFollowingId(followerId, followingId)) return

        val follower = userRepository.findById(followerId).orElseThrow()
        val following = userRepository.findById(followingId).orElseThrow()

        followRepository.save(Follow(follower = follower, following = following))
    }

    /** 🔥 언팔로우 */
    @Transactional
    fun unfollowUser(followerId: Long, followingId: Long) {
        followRepository.deleteByFollowerIdAndFollowingId(followerId, followingId)
    }

    /** 🔥 팔로워 목록 조회 (DTO 반환) */
    @Transactional(readOnly = true)
    fun getFollowers(userId: Long): List<UserSimpleDto> {
        val followers = followRepository.findFollowersByUserId(userId)
        return followers.map {
            UserSimpleDto(
                id = it.id,
                nickname = it.nickname,
                profileImg = it.profileImg
            )
        }
    }

    /** 🔥 팔로잉 목록 조회 (DTO 반환) */
    @Transactional(readOnly = true)
    fun getFollowings(userId: Long): List<UserSimpleDto> {
        val followings = followRepository.findFollowingsByUserId(userId)
        return followings.map {
            UserSimpleDto(
                id = it.id,
                nickname = it.nickname,
                profileImg = it.profileImg
            )
        }
    }
}
