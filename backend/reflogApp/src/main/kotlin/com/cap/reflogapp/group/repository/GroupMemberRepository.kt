package com.cap.reflogapp.group.repository

import com.cap.reflogapp.group.entity.GroupMember
import com.cap.reflogapp.group.entity.GroupInfo
import com.cap.reflogapp.user.entity.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface GroupMemberRepository : JpaRepository<GroupMember, Long> {

    // 특정 그룹의 모든 멤버 조회
    fun findByGroup(group: GroupInfo): List<GroupMember>

    // 특정 유저가 가입한 모든 그룹 조회
    fun findByUser(user: User): List<GroupMember>

    // 중복 가입 방지용 (이미 가입 여부 체크)
    fun existsByGroupAndUser(group: GroupInfo, user: User): Boolean
}
