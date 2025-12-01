import { StyleSheet } from "react-native";

export const ProfileEditStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 24,
        paddingTop: 40,
    },

    /* 프로필 이미지 */
    imageWrapper: {
        alignSelf: "center",
        position: "relative",
        marginBottom: 36,
    },
    profileImage: {
        width: 140,
        height: 140,
        borderRadius: 70,
        backgroundColor: "#F1F1F1",
    },
    editIconWrapper: {
        position: "absolute",
        bottom: 4,
        right: 4,
        backgroundColor: "#FF7A00",
        width: 38,
        height: 38,
        borderRadius: 19,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },

    /* 입력 폼 */
    inputBox: {
        width: "100%",
        marginBottom: 40,
    },
    label: {
        fontSize: 14,
        marginBottom: 6,
        color: "#333",
        fontWeight: "500",
    },
    input: {
        borderWidth: 1,
        borderColor: "#E0E0E0",
        backgroundColor: "#F9F9F9",
        paddingHorizontal: 14,
        paddingVertical: 12,
        borderRadius: 10,
        marginBottom: 22,
        fontSize: 15,
    },
    disabledInput: {
        opacity: 0.6,
    },

    /* 저장 버튼 */
    saveButton: {
        backgroundColor: "#FF7A00",
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: "center",

        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 3,
    },
    saveButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
    },
});
