package com.cap.reflogapp.user.controller

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.security.core.context.SecurityContextHolder

@RestController
@RequestMapping("/api/user")
class UserController {

    @GetMapping("/test")
    fun testAuth(): String {
        val auth = SecurityContextHolder.getContext().authentication
        return "인증 성공! 로그인된 사용자: ${auth.name}"
    }
}
//테스트용