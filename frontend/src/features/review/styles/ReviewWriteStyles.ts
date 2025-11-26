import { StyleSheet } from "react-native";

export const ReviewWriteStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF", // 기본 흰색
    padding: 20,
  },

  header: {
    fontSize: 22,
    fontWeight: "700",
    color: "#333333",
    marginBottom: 25,
    textAlign: "center",
  },

  label: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333333",
  },

  // 카테고리
  categoryGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  categoryButton: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 4,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#FF8A3D", // 오렌지 포인트
    backgroundColor: "#FFFFFF",
    alignItems: "center",
  },

  categorySelected: {
    backgroundColor: "#FF8A3D", // 선택 시 오렌지
    borderColor: "#FF8A3D",
  },

  categoryText: {
    fontSize: 14,
    color: "#333333",
    fontWeight: "500",
  },

  categoryTextSelected: {
    color: "#FFFFFF",
    fontWeight: "700",
  },

  // 입력창
  input: {
    borderWidth: 1,
    borderColor: "#E2E2E2",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    backgroundColor: "#FAFAFA",
    fontSize: 14,
    color: "#333333",
  },

  // 별점
  starContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
    paddingVertical: 12,
  },
});
