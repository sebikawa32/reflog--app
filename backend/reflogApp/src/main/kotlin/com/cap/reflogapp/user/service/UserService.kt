package com.cap.reflogapp.user.service

import com.cap.reflogapp.user.dto.SearchUserResponseDto
import com.cap.reflogapp.user.dto.UserResponseDto
import com.cap.reflogapp.user.repository.UserRepository
import com.cap.reflogapp.follow.repository.FollowRepository
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class UserService(
    private val userRepository: UserRepository,
    private val followRepository: FollowRepository
) {

    /** ⭐ 회원 ID로 다른 유저 프로필 조회 + isFollowing 포함 */
    @Transactional(readOnly = true)
    fun getUserById(targetId: Long, requesterId: Long): UserResponseDto {
        val target = userRepository.findById(targetId)
            .orElseThrow { IllegalArgumentException("해당 ID의 사용자를 찾을 수 없습니다. id=$targetId") }

        val followerCount = followRepository.countFollowers(target.id)
        val followingCount = followRepository.countFollowings(target.id)

        // ⭐ 로그인한 유저가 이 유저를 팔로우 중인지 체크
        val isFollowing = followRepository.existsByFollowerIdAndFollowingId(
            requesterId,
            target.id
        )

        return UserResponseDto(
            id = target.id,
            email = target.email,
            nickname = target.nickname,
            profileImg = target.profileImg,
            introduce = target.introduce,
            followerCount = followerCount,
            followingCount = followingCount,
            isFollowing = isFollowing      // ⭐ 반드시 포함
        )
    }

    /** ⭐ 현재 로그인한 사용자 정보 조회 */
    @Transactional(readOnly = true)
    fun getMyInfo(): UserResponseDto {
        val auth = SecurityContextHolder.getContext().authentication
        val email = auth.name

        val me = userRepository.findByEmail(email)
            ?: throw IllegalArgumentException("현재 로그인된 사용자를 찾을 수 없습니다. email=$email")

        val followerCount = followRepository.countFollowers(me.id)
        val followingCount = followRepository.countFollowings(me.id)

        return UserResponseDto(
            id = me.id,
            email = me.email,
            nickname = me.nickname,
            profileImg = me.profileImg,
            introduce = me.introduce,
            followerCount = followerCount,
            followingCount = followingCount,
            isFollowing = false  // ⭐ 자기 자신은 무조건 false
        )
    }

    /** 소개글 업데이트 */
    @Transactional
    fun updateIntroduce(userId: Long, introduce: String) {
        val user = userRepository.findById(userId)
            .orElseThrow { IllegalArgumentException("사용자를 찾을 수 없습니다. id=$userId") }

        user.introduce = introduce
    }

    /** 닉네임 검색 기능 */
    @Transactional(readOnly = true)
    fun searchUsers(keyword: String, myId: Long): List<SearchUserResponseDto> {

        val users = userRepository.findByNicknameContaining(keyword)

        return users.map { target ->
            val isFollowing =
                followRepository.existsByFollowerIdAndFollowingId(myId, target.id)

            SearchUserResponseDto(
                userId = target.id,
                nickname = target.nickname,
                avatarUrl = target.profileImg,
                isFollowing = isFollowing
            )
        }
    }
}
