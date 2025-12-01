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

    /** ⭐ 회원 ID로 다른 유저 프로필 조회 + 팔로잉 여부 포함 */
    @Transactional(readOnly = true)
    fun getUserById(targetId: Long, requesterId: Long): UserResponseDto {
        val target = userRepository.findById(targetId)
            .orElseThrow { IllegalArgumentException("해당 ID의 사용자를 찾을 수 없습니다. id=$targetId") }

        val followerCount = followRepository.countFollowers(target.id)
        val followingCount = followRepository.countFollowings(target.id)

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
            isFollowing = isFollowing
        )
    }

    /** ⭐ 현재 로그인한 사용자 정보 조회 */
    @Transactional(readOnly = true)
    fun getMyInfo(): UserResponseDto {
        val email = SecurityContextHolder.getContext().authentication.name

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
            isFollowing = false  // 자기 자신은 항상 false
        )
    }

    /** ⭐ 프로필 수정 (nickname / profileImg / introduce) */
    @Transactional
    fun updateMyProfile(request: UserResponseDto): UserResponseDto {
        val email = SecurityContextHolder.getContext().authentication.name

        val user = userRepository.findByEmail(email)
            ?: throw IllegalArgumentException("현재 로그인된 사용자를 찾을 수 없습니다. email=$email")

        // 수정 가능한 필드들만 변경
        user.nickname = request.nickname
        user.profileImg = request.profileImg
        user.introduce = request.introduce

        userRepository.save(user)

        // 팔로워/팔로잉 수 다시 계산
        val followerCount = followRepository.countFollowers(user.id)
        val followingCount = followRepository.countFollowings(user.id)

        return UserResponseDto(
            id = user.id,
            email = user.email,
            nickname = user.nickname,
            profileImg = user.profileImg,
            introduce = user.introduce,
            followerCount = followerCount,
            followingCount = followingCount,
            isFollowing = false // 본인 수정 시 항상 false
        )
    }

    /** 소개글만 따로 수정하는 경우 */
    @Transactional
    fun updateIntroduce(userId: Long, introduce: String) {
        val user = userRepository.findById(userId)
            .orElseThrow { IllegalArgumentException("사용자를 찾을 수 없습니다. id=$userId") }

        user.introduce = introduce
    }

    /** 🔍 닉네임 검색 기능 */
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
