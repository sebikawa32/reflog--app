import { StyleSheet } from "react-native";

export const FeedDetailStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        padding: 20,
    },

    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    /* 피드 박스 */
    feedBox: {
        backgroundColor: "#fff",
        borderRadius: 14,
        padding: 20,
        marginBottom: 25,

        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 4,

        borderWidth: 1,
        borderColor: "#F0F0F0",
    },

    feedTitle: {
        fontSize: 22,
        fontWeight: "700",
        color: "#222",
        marginBottom: 12,
    },

    feedDesc: {
        fontSize: 16,
        color: "#555",
        lineHeight: 22,
        marginBottom: 14,
    },

    feedInfo: {
        fontSize: 14,
        color: "#777",
        marginBottom: 6,
    },

    /* 리뷰 섹션 */
    reviewSection: {
        marginTop: 10,
        paddingBottom: 60,
    },

    sectionTitle: {
        fontSize: 20,
        fontWeight: "700",
        marginBottom: 12,
        color: "#333",
    },

    emptyText: {
        fontSize: 16,
        color: "#999",
        marginTop: 12,
    },

    reviewCard: {
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 12,
        marginBottom: 14,

        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,

        borderWidth: 1,
        borderColor: "#EFEFEF",
    },

    reviewUser: {
        fontSize: 15,
        fontWeight: "700",
        marginBottom: 4,
    },

    reviewRating: {
        fontSize: 14,
        color: "#FF9800",
        marginBottom: 6,
    },

    reviewContent: {
        fontSize: 14,
        color: "#555",
        lineHeight: 20,
    },

    /* 플로팅 버튼 */
    floatingButton: {
        position: "absolute",
        right: 20,
        bottom: 25,
        width: 55,
        height: 55,
        backgroundColor: "#FF7A00",
        borderRadius: 28,
        justifyContent: "center",
        alignItems: "center",

        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 3,
    },
});
