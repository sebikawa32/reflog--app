package com.cap.reflogapp.user.service

import com.cap.reflogapp.user.dto.UserResponseDto
import com.cap.reflogapp.user.repository.UserRepository
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class UserService(
    private val userRepository: UserRepository
) {

    @Transactional(readOnly = true)
    fun getUserById(userId: Long): UserResponseDto {
        val user = userRepository.findById(userId)
            .orElseThrow { IllegalArgumentException("해당 ID의 사용자를 찾을 수 없습니다. id=$userId") }

        return UserResponseDto(
            id = user.id,
            email = user.email,
            nickname = user.nickname,
            profileImg = user.profileImg
        )
    }

    @Transactional(readOnly = true)
    fun getMyInfo(): UserResponseDto {
        val email = SecurityContextHolder.getContext().authentication.name

        val user = userRepository.findByEmail(email)
            ?: throw IllegalArgumentException("현재 로그인된 사용자를 찾을 수 없습니다. email=$email")

        return UserResponseDto(
            id = user.id,
            email = user.email,
            nickname = user.nickname,
            profileImg = user.profileImg
        )
    }

    /** 🔥 UserResponseDto 재사용하여 수정 */
    @Transactional
    fun updateMyProfile(request: UserResponseDto): UserResponseDto {
        val email = SecurityContextHolder.getContext().authentication.name

        val user = userRepository.findByEmail(email)
            ?: throw IllegalArgumentException("현재 로그인된 사용자를 찾을 수 없습니다. email=$email")

        // id, email은 무시하고 nickname / profileImg만 업데이트
        user.nickname = request.nickname
        user.profileImg = request.profileImg

        userRepository.save(user)

        return UserResponseDto(
            id = user.id,
            email = user.email,
            nickname = user.nickname,
            profileImg = user.profileImg
        )
    }

}
