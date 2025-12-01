package com.cap.reflogapp.global

import com.cap.reflogapp.global.jwt.JwtAuthFilter
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.web.SecurityFilterChain
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.CorsConfigurationSource
import org.springframework.web.cors.UrlBasedCorsConfigurationSource

@Configuration
class SecurityConfig {

    @Bean
    fun filterChain(http: HttpSecurity, jwtAuthFilter: JwtAuthFilter): SecurityFilterChain {

        http
            .csrf { it.disable() }
            .cors { }
            .sessionManagement {
                it.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            }
            .authorizeHttpRequests { auth ->

                // ============================================
                // ✅ 인증 없이 가능한 API
                // ============================================
                auth.requestMatchers("/api/auth/**").permitAll() // 로그인/회원가입
                auth.requestMatchers(
                    "/api/users/check-nickname",
                    "/api/users/check-email"
                ).permitAll()

                // 리뷰 조회는 공개 가능
                auth.requestMatchers("/api/group-feed/review/**").permitAll()

                // ============================================
                // ❗ 인증 필요한 API들 (permitAll 제거)
                // ============================================
                auth.requestMatchers("/api/users/me").authenticated()
                auth.requestMatchers("/api/groups/**").authenticated()
                auth.requestMatchers("/api/posts/**").authenticated()
                auth.requestMatchers("/api/follow/**").authenticated()
                auth.requestMatchers("/api/group-feed/**").authenticated()

                // ============================================
                // 그 외 모든 요청도 인증 필요
                // ============================================
                auth.anyRequest().authenticated()
            }
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter::class.java)

        return http.build()
    }

    @Bean
    fun corsConfigurationSource(): CorsConfigurationSource {
        val config = CorsConfiguration()
        config.allowedOrigins = listOf("*")
        config.allowedMethods = listOf("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS")
        config.allowedHeaders = listOf("*")
        config.allowCredentials = false

        val source = UrlBasedCorsConfigurationSource()
        source.registerCorsConfiguration("/**", config)
        return source
    }

    @Bean
    fun passwordEncoder(): BCryptPasswordEncoder = BCryptPasswordEncoder()
}
