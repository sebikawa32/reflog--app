package com.cap.reflogapp.post.dto

import com.cap.reflogapp.post.entity.Post
import com.cap.reflogapp.user.entity.User

data class PostResponseDto(
    val postId: Long,
    val title: String,
    val content: String,
    val imageUrl: String?,
    val category: String,
    val rating: Double?,
    val createdAt: String,
    val updatedAt: String,
    val detail: Any?,

    val userId: Long,
    val userNickname: String,
    val userProfileImage: String?
) {
    companion object {

        fun fromEntity(
            post: Post,
            user: User,
            detail: Any? = null
        ): PostResponseDto {

            return PostResponseDto(
                postId = post.postId,
                title = post.title,
                content = post.content,
                imageUrl = post.imageUrl,
                category = post.category,
                rating = post.rating,
                createdAt = post.createdAt.toString(),
                updatedAt = post.updatedAt.toString(),
                detail = detail,

                userId = user.id,
                userNickname = user.nickname,

                // 🔥 User 엔티티에 profileImage 없으면 null 안전처리
                userProfileImage = try {
                    // 필드 있으면 가져오고 없으면 null
                    User::class.java.getDeclaredField("profileImage").let {
                        it.isAccessible = true
                        it.get(user) as? String
                    }
                } catch (e: Exception) {
                    null
                }
            )
        }
    }
}
