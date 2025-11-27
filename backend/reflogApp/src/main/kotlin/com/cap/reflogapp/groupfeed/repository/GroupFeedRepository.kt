package com.cap.reflogapp.groupfeed.repository

import com.cap.reflogapp.group.entity.GroupInfo
import com.cap.reflogapp.groupfeed.entity.GroupFeed
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface GroupFeedRepository : JpaRepository<GroupFeed, Long> {

    fun findByGroup(group: GroupInfo): List<GroupFeed>

}
