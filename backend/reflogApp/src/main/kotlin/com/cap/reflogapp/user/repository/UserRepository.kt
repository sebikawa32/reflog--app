package com.cap.reflogapp.user.repository

import com.cap.reflogapp.user.entity.User
import org.springframework.data.jpa.repository.JpaRepository

interface UserRepository : JpaRepository<User, Long> {
    fun existsByEmail(email: String): Boolean
    fun existsByNickname(nickname: String): Boolean
}
