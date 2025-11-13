import { StyleSheet } from "react-native";

export const LoginStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  appTitle: {
    fontSize: 34,
    fontWeight: "800",
    color: "#FF7A00", // 오렌지 포인트 컬러
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    color: "#808080",
  },
  form: {
    marginBottom: 25,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 14,
    fontSize: 15,
    color: "#333",
    marginBottom: 14,
    backgroundColor: "#FAFAFA",
  },
  // ✅ 비밀번호 줄(아이콘 포함) — 외곽선 하나로 통합
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    paddingHorizontal: 14,
    backgroundColor: "#FAFAFA",
    marginBottom: 14,
  },
  loginButton: {
    backgroundColor: "#FF7A00",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 6,
    marginBottom: 10,
    shadowColor: "#FF7A00",
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 3,
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },
  linkText: {
    color: "#FF7A00",
    fontSize: 13,
    textAlign: "center",
    marginTop: 8,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E0E0E0",
  },
  dividerText: {
    marginHorizontal: 10,
    color: "#A0A0A0",
    fontSize: 13,
  },
  socialContainer: {
    alignItems: "center",
    marginBottom: 25,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 18,
    backgroundColor: "#FFFFFF",
  },
  socialText: {
    marginLeft: 8,
    color: "#FF7A00",
    fontSize: 15,
    fontWeight: "600",
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  signupText: {
    color: "#808080",
    fontSize: 14,
  },
  signupLink: {
    color: "#FF7A00",
    fontWeight: "700",
    fontSize: 14,
  },
});
