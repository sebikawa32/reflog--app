import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

export const ReviewDetailStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 20,
  },

  /* --- 표지 이미지 --- */
  coverWrapper: {
    position: "relative",
    alignItems: "center",
    marginBottom: 28,
  },
  coverImage: {
    width: width * 0.86,
    height: 260,
    borderRadius: 14,
    resizeMode: "cover",
  },
  overlay: {
    position: "absolute",
    width: width * 0.86,
    height: 260,
    borderRadius: 14,
    backgroundColor: "rgba(0,0,0,0.08)",
  },

  /* --- 제목 --- */
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#2F2F2F",
    textAlign: "center",
    marginBottom: 6,
  },
  titleDivider: {
    width: 60,
    height: 3,
    backgroundColor: "#FF7A00",
    alignSelf: "center",
    borderRadius: 3,
    marginVertical: 12,
  },

  /* --- 메타 / 카테고리 / 상세 정보 --- */
  meta: {
    fontSize: 15,
    color: "#3A332D",        // ⭐ 통일된 글씨색
    marginBottom: 6,
  },

  /* --- 별점 --- */
  ratingContainer: {
    alignItems: "center",
    marginBottom: 8,
  },
  stars: {
    flexDirection: "row",
    marginBottom: 4,
  },
  star: {
    fontSize: 30,
    color: "#E0D7CF",
    marginHorizontal: 3,
  },
  activeStar: {
    color: "#FFAA3B",
  },
  selectedStar: {
    textShadowColor: "#FFDCA7",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 6,
  },
  ratingLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#5A5148",        // ⭐ 부드럽게 보이는 서브톤
  },

  /* --- 본문 (내 설명) --- */
  content: {
    fontSize: 16,
    color: "#3A332D",        // ⭐ 메타랑 같은 톤으로 통일
    lineHeight: 26,
    marginTop: 10,
    marginBottom: 26,
    paddingHorizontal: 4,
  },
});
