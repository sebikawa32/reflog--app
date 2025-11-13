package com.cap.reflogapp.global

import com.cap.reflogapp.global.jwt.JwtAuthFilter
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.web.SecurityFilterChain
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter

@Configuration
class SecurityConfig {

    @Bean
    fun filterChain(http: HttpSecurity, jwtAuthFilter: JwtAuthFilter): SecurityFilterChain {
        http
            .csrf { it.disable() } // ✅ POST/PUT 요청 허용
            .sessionManagement { it.sessionCreationPolicy(SessionCreationPolicy.STATELESS) } // ✅ JWT는 세션 사용 X
            .authorizeHttpRequests { auth ->
                auth
                    // ✅ 인증 없이 접근 가능한 경로들
                    .requestMatchers("/api/auth/**").permitAll()
                    .requestMatchers("/api/groups/**").permitAll()  // 🆘 그룹 API 전체 허용 (테스트용) 추후 수정
                    .requestMatchers("/api/posts/**").permitAll()
                    .anyRequest().authenticated() // 그 외는 인증 필요
            }
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter::class.java)

        return http.build()
    }

    // 비밀번호 암호화를 위한 Bean 등록
    @Bean
    fun passwordEncoder(): BCryptPasswordEncoder = BCryptPasswordEncoder()
}
