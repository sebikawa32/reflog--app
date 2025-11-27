import { StyleSheet } from "react-native";

export const GroupFeedCreateStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        padding: 20,
    },

    title: {
        fontSize: 22,
        fontWeight: "700",
        marginBottom: 20,
    },

    label: {
        fontSize: 15,
        fontWeight: "500",
        marginTop: 15,
        marginBottom: 6,
    },

    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 12,
        borderRadius: 6,
        fontSize: 15,
    },

    categoryRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginBottom: 10,
    },

    categoryButton: {
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#ccc",
        marginRight: 10,
        marginBottom: 10,
    },

    categorySelected: {
        backgroundColor: "#FF7043",
        borderColor: "#FF7043",
    },

    categoryText: {
        fontSize: 13,
        color: "#444",
    },

    categoryTextSelected: {
        color: "#fff",
    },

    createButton: {
        backgroundColor: "#FF7043",
        padding: 15,
        borderRadius: 8,
        marginTop: 25,
        alignItems: "center",
    },

    createButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
    },
});
