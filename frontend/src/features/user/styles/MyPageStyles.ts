import { StyleSheet } from "react-native";

export const MyPageStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#FF7A00",
  },
  nickname: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333333",
    marginBottom: 40,
  },
  logoutButton: {
    backgroundColor: "#FF7A00",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
    elevation: 3,
  },
  logoutText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 16,
  },
});
