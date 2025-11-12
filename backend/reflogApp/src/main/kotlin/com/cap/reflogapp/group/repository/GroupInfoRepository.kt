package com.cap.reflogapp.group.repository

import com.cap.reflogapp.group.entity.GroupInfo
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface GroupInfoRepository : JpaRepository<GroupInfo, Long> {

    // 그룹 이름으로 검색
    fun findByGroupNameContainingIgnoreCase(keyword: String): List<GroupInfo>

    // 특정 유저가 리더인 그룹 찾기 (수정됨)
    fun findByLeader_Id(id: Long): List<GroupInfo>   // ✅ 수정 완료
}
