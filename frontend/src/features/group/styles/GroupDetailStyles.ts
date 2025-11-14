import { StyleSheet } from "react-native";

export const GroupDetailStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        padding: 20,
    },

    title: {
        fontSize: 22,
        fontWeight: "700",
        color: "#333333",
        borderLeftWidth: 4,
        borderLeftColor: "#FF7A00",
        paddingLeft: 10,
        marginBottom: 15,
    },

    description: {
        fontSize: 15,
        color: "#555555",
        lineHeight: 22,
        marginBottom: 20,
    },

    joinButton: {
        backgroundColor: "#FF7A00",
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 20,
    },

    joinButtonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "700",
    },

    joinedText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#FF7A00",
        marginTop: 20,
    },
});
