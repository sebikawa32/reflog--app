package com.cap.reflogapp.user.service

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

    /** 회원 ID로 조회 */
    @Transactional(readOnly = true)
    fun getUserById(userId: Long): UserResponseDto {
        val user = userRepository.findById(userId)
            .orElseThrow { IllegalArgumentException("해당 ID의 사용자를 찾을 수 없습니다. id=$userId") }

        val followerCount = followRepository.countFollowers(user.id)
        val followingCount = followRepository.countFollowings(user.id)

        return UserResponseDto(
            id = user.id,
            email = user.email,
            nickname = user.nickname,
            profileImg = user.profileImg,
            introduce = user.introduce,     // ⭐ 소개글 반환 추가
            followerCount = followerCount,
            followingCount = followingCount
        )
    }

    /** 현재 로그인한 사용자 정보 조회 */
    @Transactional(readOnly = true)
    fun getMyInfo(): UserResponseDto {
        val auth = SecurityContextHolder.getContext().authentication
        val email = auth.name  // JWT subject(email)

        val user = userRepository.findByEmail(email)
            ?: throw IllegalArgumentException("현재 로그인된 사용자를 찾을 수 없습니다. email=$email")

        val followerCount = followRepository.countFollowers(user.id)
        val followingCount = followRepository.countFollowings(user.id)

        return UserResponseDto(
            id = user.id,
            email = user.email,
            nickname = user.nickname,
            profileImg = user.profileImg,
            introduce = user.introduce,     // ⭐ 소개글 반환 추가
            followerCount = followerCount,
            followingCount = followingCount
        )
    }

    /** ⭐ 소개글 업데이트 */
    @Transactional
    fun updateIntroduce(userId: Long, introduce: String) {
        val user = userRepository.findById(userId)
            .orElseThrow { IllegalArgumentException("사용자를 찾을 수 없습니다. id=$userId") }

        user.introduce = introduce
    }
}
