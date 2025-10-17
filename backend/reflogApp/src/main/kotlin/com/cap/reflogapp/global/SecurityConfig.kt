package com.cap.reflogapp.global

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.web.SecurityFilterChain

@Configuration
class SecurityConfig {

    @Bean
    fun filterChain(http: HttpSecurity): SecurityFilterChain {
        http
            .csrf { it.disable() } // ✅ POST, PUT 요청 허용
            .authorizeHttpRequests { auth ->
                auth.anyRequest().permitAll() // ✅ 인증 없이 모든 요청 허용
            }
        return http.build()
    }
}
