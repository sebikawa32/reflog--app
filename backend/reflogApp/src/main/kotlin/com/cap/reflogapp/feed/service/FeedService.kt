package com.cap.reflogapp.feed.service

import com.cap.reflogapp.feed.dto.FeedPostDto
import com.cap.reflogapp.follow.repository.FollowRepository
import com.cap.reflogapp.post.repository.PostRepository
import com.cap.reflogapp.user.repository.UserRepository
import org.springframework.stereotype.Service

@Service
class FeedService(
    private val followRepository: FollowRepository,
    private val postRepository: PostRepository,
    private val userRepository: UserRepository
) {

    fun getFollowingFeed(userId: Long): List<FeedPostDto> {

        // 1. 내가 팔로우한 사용자 리스트
        val followingUsers = followRepository.findFollowingsByUserId(userId)

        if (followingUsers.isEmpty()) return emptyList()

        // 2. 그들의 userId 리스트
        val followingIds = followingUsers.map { it.id }

        // 3. 해당 유저들의 게시글 최신순 조회
        val posts = postRepository.findByUserIdInOrderByCreatedAtDesc(followingIds)

        // 4. 게시글 + 작성자 정보 매핑
        return posts.map { post ->
            val author = userRepository.findById(post.userId).get()

            FeedPostDto(
                postId = post.postId,
                userId = author.id,
                userNickname = author.nickname,
                userProfileImage = author.profileImg,
                title = post.title,
                rating = post.rating,
                content = post.content,
                imageUrl = post.imageUrl,
                createdAt = post.createdAt.toString()
            )
        }

    }
}
