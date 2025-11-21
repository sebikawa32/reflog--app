package com.cap.reflogapp.group.repository

import com.cap.reflogapp.group.entity.GroupInfo
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository

@Repository
interface GroupInfoRepository : JpaRepository<GroupInfo, Long> {

    // 기존 기능: 그룹 이름으로 검색
    fun findByGroupNameContainingIgnoreCase(keyword: String): List<GroupInfo>

    // 확장 기능: 이름 + 설명 전체 검색
    @Query(
        """
        SELECT g FROM GroupInfo g
        WHERE LOWER(g.groupName) LIKE LOWER(CONCAT('%', :keyword, '%'))
           OR LOWER(g.description) LIKE LOWER(CONCAT('%', :keyword, '%'))
        """
    )
    fun searchByNameOrDescription(@Param("keyword") keyword: String): List<GroupInfo>

    // 특정 유저가 리더인 그룹 조회
    fun findByLeader_Id(id: Long): List<GroupInfo>
}
