package com.cap.reflogapp.global.jwt

import jakarta.servlet.FilterChain
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.core.userdetails.User
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource
import org.springframework.stereotype.Component
import org.springframework.web.filter.OncePerRequestFilter

@Component
class JwtAuthFilter(
    private val jwtTokenProvider: JwtTokenProvider
) : OncePerRequestFilter() {

    override fun doFilterInternal(
        request: HttpServletRequest,
        response: HttpServletResponse,
        filterChain: FilterChain
    ) {
        val path = request.requestURI

        // ✅ JWT 검증을 제외할 경로들 (회원가입, 로그인, 그룹 관련)
        if (path.startsWith("/api/auth") || path.startsWith("/api/groups")) {
            filterChain.doFilter(request, response)
            return
        }

        val token = resolveToken(request)

        if (token != null && jwtTokenProvider.validateToken(token)) {
            val email = jwtTokenProvider.getUserEmail(token)
            val userId = jwtTokenProvider.getUserId(token) // ✅ userId 추출

            // ✅ SecurityContext에 인증 객체 등록
            val principal = User(email, "", emptyList())
            val authentication = UsernamePasswordAuthenticationToken(principal, null, emptyList())
            authentication.details = WebAuthenticationDetailsSource().buildDetails(request)
            SecurityContextHolder.getContext().authentication = authentication

            // ✅ Controller에서 쓸 수 있도록 userId 전달
            request.setAttribute("userId", userId)
        }

        // ✅ 다음 필터로 전달
        filterChain.doFilter(request, response)
    }

    // ✅ Authorization 헤더에서 Bearer 토큰 추출
    private fun resolveToken(request: HttpServletRequest): String? {
        val bearerToken = request.getHeader("Authorization")
        return if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            bearerToken.substring(7)
        } else null
    }
}
