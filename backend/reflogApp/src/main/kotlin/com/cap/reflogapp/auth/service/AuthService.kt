package com.cap.reflogapp.auth.service

import com.cap.reflogapp.auth.dto.*
import com.cap.reflogapp.auth.entity.UserToken
import com.cap.reflogapp.auth.repository.UserTokenRepository
import com.cap.reflogapp.global.jwt.JwtTokenProvider
import com.cap.reflogapp.user.entity.User
import com.cap.reflogapp.user.repository.UserRepository
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.time.LocalDateTime

@Service
class AuthService(
    private val userRepository: UserRepository,
    private val passwordEncoder: BCryptPasswordEncoder,
    private val jwtTokenProvider: JwtTokenProvider,
    private val userTokenRepository: UserTokenRepository
) {

    /** 회원가입 **/
    @Transactional
    fun signup(request: SignupRequestDto): SignupResponseDto {
        if (userRepository.existsByEmail(request.email))
            throw IllegalArgumentException("이미 등록된 이메일입니다.")
        if (userRepository.existsByNickname(request.nickname))
            throw IllegalArgumentException("이미 사용 중인 닉네임입니다.")

        val encodedPassword = passwordEncoder.encode(request.password)

        val user = User(
            email = request.email,
            password = encodedPassword,
            nickname = request.nickname,
            profileImg = request.profileImg,
            coverImg = request.coverImg,
            bio = request.bio
        )

        val saved = userRepository.save(user)

        return SignupResponseDto(
            userId = saved.id,
            email = saved.email,
            nickname = saved.nickname,
            profileImg = saved.profileImg,
            coverImg = saved.coverImg,
            level = saved.level,
            exp = saved.exp,
            bio = saved.bio,
            createdAt = saved.createdAt.toString()
        )
    }

    /** 로그인 (Access + Refresh Token 발급) **/
    @Transactional
    fun login(request: LoginRequestDto): LoginResponseDto {
        val user = userRepository.findAll()
            .find { it.email == request.email }
            ?: throw IllegalArgumentException("존재하지 않는 이메일입니다.")

        if (!passwordEncoder.matches(request.password, user.password)) {
            throw IllegalArgumentException("비밀번호가 일치하지 않습니다.")
        }

        val accessToken = jwtTokenProvider.createAccessToken(user.id, user.email)
        val refreshToken = jwtTokenProvider.createRefreshToken()

        // ✅ 기존 토큰 있으면 삭제 후 새로 저장
        userTokenRepository.findByUser_Id(user.id)?.let {
            userTokenRepository.delete(it)
        }

        userTokenRepository.save(
            UserToken(
                user = user,
                refreshToken = refreshToken,
                expiresAt = LocalDateTime.now().plusDays(14)
            )
        )

        return LoginResponseDto(
            accessToken = accessToken,
            refreshToken = refreshToken,
            user = SimpleUserDto(
                userId = user.id,
                email = user.email,
                nickname = user.nickname
            )
        )
    }

    /** Refresh Token으로 Access Token 재발급 **/
    @Transactional(readOnly = true)
    fun refreshAccessToken(refreshToken: String): String? {
        if (!jwtTokenProvider.validateToken(refreshToken)) return null

        val tokenEntity = userTokenRepository.findByRefreshToken(refreshToken)
            ?: return null

        val user = userRepository.findById(tokenEntity.user.id)
            .orElse(null) ?: return null

        return jwtTokenProvider.createAccessToken(user.id, user.email)
    }

    /** ✅ 로그아웃 (Access Token 없이 Refresh Token 삭제만 수행) **/
    @Transactional
    fun logout(refreshToken: String) {
        val tokenEntity = userTokenRepository.findByRefreshToken(refreshToken)
            ?: throw IllegalArgumentException("유효하지 않은 Refresh Token입니다.")

        userTokenRepository.delete(tokenEntity)
    }
}
