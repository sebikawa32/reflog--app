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
        val method = request.method

        // -----------------------------------------------------------
        // 🔥 PUBLIC API (토큰 없이 접근 가능한 API)
        // -----------------------------------------------------------
        val isPublic =
            path == "/api/auth/login" ||
                    path == "/api/auth/join" ||
                    (path == "/api/groups" && method == "GET") ||
                    path.startsWith("/api/groups/search") ||

                    // 🔥 리뷰 조회만 public (create/update/delete 제외)
                    path.startsWith("/api/group-feed/review")

        // ⚠️ 여기 절대 "/api/groups/not-joined" 추가하면 안 됨
        //    추가되면 JWT를 읽지 않아서 userId가 null → 에러 발생

        if (isPublic) {
            filterChain.doFilter(request, response)
            return
        }

        // -----------------------------------------------------------
        // 🔥 PRIVATE API (토큰 필수)
        // -----------------------------------------------------------
        val token = resolveToken(request)

        if (token != null && jwtTokenProvider.validateToken(token)) {

            val email = jwtTokenProvider.getUserEmail(token)
            val userId = jwtTokenProvider.getUserId(token)

            val principal = User(email, "", emptyList())
            val authentication = UsernamePasswordAuthenticationToken(
                principal,
                null,
                emptyList()
            )

            authentication.details = WebAuthenticationDetailsSource().buildDetails(request)
            SecurityContextHolder.getContext().authentication = authentication

            // ⭐ Controller에서 userId 바로 꺼낼 수 있음
            request.setAttribute("userId", userId)
        }

        filterChain.doFilter(request, response)
    }

    private fun resolveToken(request: HttpServletRequest): String? {
        val bearerToken = request.getHeader("Authorization")
        return if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            bearerToken.substring(7)
        } else null
    }
}
