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
  },

  /* --- 표지 이미지 (세로 직사각형으로 변경) --- */
  coverWrapper: {
    width: "100%",
    height: width * 1.4,     // ⭐ 세로 직사각형 비율 (예: 300x420 느낌)
    marginBottom: 28,
    overflow: "hidden",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    backgroundColor: "#EEE",
  },

  coverImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",     // ⭐ 비율 유지하면서 꽉 채움
  },

  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.12)", // 은은한 어둡게
  },

  /* --- 제목 --- */
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#2F2F2F",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 6,
    paddingHorizontal: 10,
  },

  titleDivider: {
    width: 60,
    height: 3,
    backgroundColor: "#FF7A00",
    alignSelf: "center",
    borderRadius: 3,
    marginVertical: 12,
  },

  /* --- 메타 정보 --- */
  meta: {
    fontSize: 15,
    color: "#3A332D",
    marginBottom: 6,
    lineHeight: 22,
  },

  /* --- 별점 --- */
  ratingContainer: {
    alignItems: "center",
    marginBottom: 8,
    marginTop: 4,
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
    color: "#5A5148",
  },

  /* --- 본문 --- */
  content: {
    fontSize: 16,
    color: "#3A332D",
    lineHeight: 26,
    marginTop: 10,
    marginBottom: 26,
    paddingHorizontal: 16,
  },
});
