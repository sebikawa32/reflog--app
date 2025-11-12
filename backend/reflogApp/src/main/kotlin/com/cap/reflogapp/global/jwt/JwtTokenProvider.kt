package com.cap.reflogapp.global.jwt

import io.jsonwebtoken.*
import io.jsonwebtoken.io.Decoders
import io.jsonwebtoken.security.Keys
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component
import java.util.*
import javax.crypto.SecretKey

@Component
class JwtTokenProvider(
    @Value("\${jwt.secret}") private val secretKey: String
) {
    private val accessTokenValidTime: Long = 30 * 60 * 1000 // 30분
    private val refreshTokenValidTime: Long = 14 * 24 * 60 * 60 * 1000 // 2주

    /** ✅ 서명 키 생성 */
    private fun getSigningKey(): SecretKey {
        val keyBytes = Decoders.BASE64.decode(secretKey)
        return Keys.hmacShaKeyFor(keyBytes)
    }

    /** ✅ Access Token 생성 (userId + email 포함) */
    fun createAccessToken(userId: Long, email: String): String {
        val now = Date()
        val expiry = Date(now.time + accessTokenValidTime)

        return Jwts.builder()
            .setSubject(email) // 이메일은 sub
            .claim("userId", userId) // userId를 claim에 포함
            .setIssuedAt(now)
            .setExpiration(expiry)
            .signWith(getSigningKey(), SignatureAlgorithm.HS256)
            .compact()
    }

    /** ✅ Refresh Token 생성 */
    fun createRefreshToken(): String {
        val now = Date()
        val expiry = Date(now.time + refreshTokenValidTime)

        return Jwts.builder()
            .setIssuedAt(now)
            .setExpiration(expiry)
            .signWith(getSigningKey(), SignatureAlgorithm.HS256)
            .compact()
    }

    /** ✅ 토큰 유효성 검증 */
    fun validateToken(token: String): Boolean {
        return try {
            val claims = Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
            !claims.body.expiration.before(Date())
        } catch (e: ExpiredJwtException) {
            false
        } catch (e: JwtException) {
            false
        } catch (e: IllegalArgumentException) {
            false
        }
    }

    /** ✅ 이메일 추출 (sub에서 가져옴) */
    fun getUserEmail(token: String): String {
        val claims = Jwts.parserBuilder()
            .setSigningKey(getSigningKey())
            .build()
            .parseClaimsJws(token)
        return claims.body.subject
    }

    /** ✅ userId 추출 (claims에서 userId 키로 가져옴) */
    fun getUserId(token: String): Long {
        val claims = Jwts.parserBuilder()
            .setSigningKey(getSigningKey())
            .build()
            .parseClaimsJws(token)
        val userIdValue = claims.body["userId"]
            ?: throw IllegalArgumentException("userId not found in token")
        return userIdValue.toString().toLong()
    }
}
