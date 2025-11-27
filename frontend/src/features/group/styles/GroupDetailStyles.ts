import { StyleSheet } from "react-native";

export const GroupDetailStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        padding: 20,
    },

    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },

    // 그룹 이름
    title: {
        fontSize: 22,
        fontWeight: "700",
        color: "#222",
        borderLeftWidth: 4,
        borderLeftColor: "#FF7043",
        paddingLeft: 10,
    },

    inboxButton: {
        padding: 5,
    },

    // 그룹 설명
    description: {
        fontSize: 15,
        color: "#555",
        lineHeight: 20,
        marginVertical: 12,
    },

    // 리더 정보
    leaderText: {
        fontSize: 14,
        color: "#888",
        marginBottom: 20,
    },

    // 구분선
    divider: {
        height: 1,
        backgroundColor: "#E0E0E0",
        marginVertical: 18,
    },

    // 피드 타이틀
    feedTitle: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 10,
    },

    // 피드 카드
    feedCard: {
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 12,
        marginBottom: 14,
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 4,
        elevation: 2,
    },

    feedHeaderRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 6,
    },

    feedTitleText: {
        fontSize: 16,
        fontWeight: "700",
        marginBottom: 4,
    },

    feedDateText: {
        fontSize: 12,
        color: "#999",
    },

    feedGoalText: {
        fontSize: 12,
        fontWeight: "600",
        color: "#FF7043",
    },

    // 피드 없음 문구
    emptyFeedContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 40,
    },

    emptyFeedText: {
        fontSize: 18,
        color: "#999",
        textAlign: "center",
        fontWeight: "600",
    },

    // 리더만 보이는 + 버튼
    fab: {
        position: "absolute",
        right: 20,
        bottom: 30,
        width: 54,
        height: 54,
        borderRadius: 27,
        backgroundColor: "#FF7043",
        justifyContent: "center",
        alignItems: "center",
        elevation: 3,
    },
    fabText: {
        color: "#fff",
        fontSize: 30,
        lineHeight: 30,
    },
});
