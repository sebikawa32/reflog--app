import { StyleSheet } from "react-native";

export const GroupExploreStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
    },

    /* 그룹 미리보기 카드 */
    card: {
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        backgroundColor: "#fff",
    },
    name: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 4,
    },
    desc: {
        fontSize: 14,
        color: "#555",
        marginBottom: 6,
    },

    /*  멤버 수 스타일 (추가됨) */
    memberCount: {
        fontSize: 13,
        color: "#777",
        marginBottom: 10,
    },

    /* 가입 버튼 */
    joinButton: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        backgroundColor: "#4CAF50",
        borderRadius: 6,
        alignItems: "center",
        alignSelf: "flex-start",
        marginTop: 4,
    },
    joinButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },

    /* 오른쪽 하단 + 버튼 */
    fab: {
        position: "absolute",
        bottom: 20,
        right: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#FF7A00",
        justifyContent: "center",
        alignItems: "center",
    },
    fabText: {
        color: "#fff",
        fontSize: 28,
        lineHeight: 30,
    },

    /* 검색창 */
    searchInput: {
        width: "95%",
        alignSelf: "center",
        backgroundColor: "#f2f2f2",
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 10,
        marginBottom: 10,
        fontSize: 15,
    },

    /* 검색 결과 없음 */
    emptyText: {
        textAlign: "center",
        color: "#999",
        marginTop: 20,
    },

    pendingButton: {
        paddingVertical: 10,
        paddingHorizontal: 16,   // ← joinButton과 동일하게
        backgroundColor: "#BDBDBD",
        borderRadius: 6,
        alignItems: "center",
        alignSelf: "flex-start",
        marginTop: 4,
    },
    
    
});
