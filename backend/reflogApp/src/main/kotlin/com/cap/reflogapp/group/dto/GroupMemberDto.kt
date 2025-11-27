data class GroupMemberDto(
    val id: Long,
    val groupId: Long,
    val userId: Long,
    val nickname: String?,
    val joinedAt: String?,
    val status: String
)
