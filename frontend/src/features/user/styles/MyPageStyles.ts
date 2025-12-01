import { StyleSheet } from "react-native";

export const MyPageStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
    },

    header: {
        alignItems: "center",
        paddingTop: 60,        // ⬆️ 여유 공간 크게
        paddingBottom: 40,     // ⬇️ 여유 공간 증가
        backgroundColor: "#fff",
    },

    avatarWrapper: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "#FFE4D1",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 16,
    },

    avatar: {
        width: 90,
        height: 90,
        borderRadius: 45,
    },

    name: {
        fontSize: 22,
        fontWeight: "700",
        color: "#222",
        marginTop: 10,
    },

    email: {
        fontSize: 15,
        color: "#888",
        marginTop: 4,
    },

    editButton: {
        marginTop: 16,
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderColor: "#FF7A00",
        borderWidth: 1,
        borderRadius: 20,
    },

    editButtonText: {
        color: "#FF7A00",
        fontWeight: "600",
    },

    statsBox: {
        marginHorizontal: 20,
        marginTop: 20,
        backgroundColor: "#fff",
        borderRadius: 12,
        paddingVertical: 20,
        flexDirection: "row",
        justifyContent: "space-around",
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },

    statItem: {
        alignItems: "center",
    },

    statNumber: {
        fontSize: 18,
        fontWeight: "700",
        color: "#FF7A00",
    },

    statLabel: {
        fontSize: 12,
        color: "#555",
        marginTop: 4,
    },

    sectionBox: {
        marginTop: 24,
        marginHorizontal: 20,
        backgroundColor: "#fff",
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 16,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },

    sectionTitle: {
        fontSize: 15,
        fontWeight: "700",
        marginBottom: 12,
        color: "#333",
    },

    itemRow: {
        paddingVertical: 12,
    },

    itemText: {
        fontSize: 14,
        color: "#444",
    },

    logoutButton: {
        marginTop: 40,
        alignItems: "center",
        paddingVertical: 16,
    },

    logoutText: {
        fontSize: 16,
        color: "#FF3B30",
        fontWeight: "700",
    },
});
