package com.cap.reflogapp.auth.repository

import com.cap.reflogapp.auth.entity.UserToken
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface UserTokenRepository : JpaRepository<UserToken, Long> {
    fun findByRefreshToken(refreshToken: String): UserToken?

    // ✅ User 엔티티의 PK 이름(id)에 맞게 설정
    fun findByUser_Id(userId: Long): UserToken?
}
