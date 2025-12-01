package com.cap.reflogapp.user.repository

import com.cap.reflogapp.user.entity.User
import org.springframework.data.jpa.repository.JpaRepository

interface UserRepository : JpaRepository<User, Long> {

    fun existsByEmail(email: String): Boolean

    fun existsByNickname(nickname: String): Boolean

    fun findByEmail(email: String): User? // 현재 로그인한 사용자 조회용

    /** 닉네임 검색 (부분 일치) */
    fun findByNicknameContaining(keyword: String): List<User>
}
