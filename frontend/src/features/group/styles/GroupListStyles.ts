import { StyleSheet } from "react-native";

export const GroupListStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        padding: 18,
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: "700",
        marginVertical: 12,
        color: "#333333",

        borderLeftWidth: 4,
        borderLeftColor: "#FF7A00", // 🍊 포인트
        paddingLeft: 8,
    },

    groupCard: {
        backgroundColor: "#FFFFFF",
        padding: 16,
        borderRadius: 14,

        borderWidth: 1,
        borderColor: "#FFE2CC", // 🍊 연한 오렌지 테두리

        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,

        marginBottom: 12,
    },

    groupName: {
        fontSize: 16,
        fontWeight: "700",
        color: "#333333",
    },

    joined: {
        marginTop: 6,
        fontSize: 14,
        color: "#FF7A00", // 🍊 이미 가입 포인트
        fontWeight: "600",
    },

    notJoined: {
        marginTop: 6,
        fontSize: 14,
        color: "#777777",
    },
});
