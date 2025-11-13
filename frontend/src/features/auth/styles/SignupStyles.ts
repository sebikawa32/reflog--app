import { StyleSheet } from "react-native";

export const SignupStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flexGrow: 1,
    padding: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FF7A00", // 오렌지 포인트
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#D5D9E0",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    backgroundColor: "#FFF",
    fontSize: 14,
  },
  signupButton: {
    backgroundColor: "#FF7A00",
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
    shadowColor: "#FF7A00",
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 3,
  },
  signupButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
  linkText: {
    color: "#FF7A00",
    textAlign: "center",
    marginTop: 16,
    fontWeight: "500",
  },
});
