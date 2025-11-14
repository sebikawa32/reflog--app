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
    card: {
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
    },
    name: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 6,
    },
    desc: {
        fontSize: 14,
        color: "#555",
        marginBottom: 12,
    },
    joinButton: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        backgroundColor: "#4CAF50",
        borderRadius: 6,
        alignItems: "center",
    },
    joinButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },

    /* 🔥 오른쪽 하단 + 버튼 */
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
});
