import { StyleSheet } from "react-native";

export const GroupReviewCreateStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FAFAFA",
        padding: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: "700",
        marginBottom: 20,
        color: "#222",
    },
    label: {
        fontSize: 16,
        fontWeight: "600",
        marginTop: 10,
        marginBottom: 6,
        color: "#444",
    },
    starContainer: {
        flexDirection: "row",
        marginBottom: 20,
        gap: 4,
    },
    input: {
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E0E0E0",
        padding: 12,
        minHeight: 90,
        textAlignVertical: "top",
        color: "#333",
        fontSize: 15,
        shadowColor: "#000",
        shadowOpacity: 0.02,
        shadowRadius: 3,
    },
    button: {
        backgroundColor: "#FF7A00",
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 30,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 4,
    },
    buttonText: {
        color: "#fff",
        fontSize: 17,
        fontWeight: "700",
    },
});
