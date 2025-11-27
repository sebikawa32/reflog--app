package com.cap.reflogapp.group.repository

import com.cap.reflogapp.group.entity.GroupInfo
import com.cap.reflogapp.group.entity.GroupMember
import com.cap.reflogapp.group.entity.GroupMemberStatus
import com.cap.reflogapp.user.entity.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository

@Repository
interface GroupMemberRepository : JpaRepository<GroupMember, Long> {

    fun findByGroup(group: GroupInfo): List<GroupMember>

    fun findByGroupAndStatus(group: GroupInfo, status: GroupMemberStatus): List<GroupMember>

    fun findByUser(user: User): List<GroupMember>

    fun findByUserAndStatus(user: User, status: GroupMemberStatus): List<GroupMember>

    fun existsByGroupAndUser(group: GroupInfo, user: User): Boolean

    @Query("SELECT COUNT(m) FROM GroupMember m WHERE m.group.id = :groupId AND m.status = com.cap.reflogapp.group.entity.GroupMemberStatus.APPROVED")
    fun countApprovedMembers(@Param("groupId") groupId: Long): Int

}

