import { StyleSheet } from "react-native";

export const HomeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  /* 🔹 프로필 */
  profileContainer: {
    alignItems: "center",
    paddingVertical: 22,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 12,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#3B3025",
  },
  statsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
  },
  statsText: {
    fontSize: 14,
    color: "#6B5F52",
  },
  dot: {
    marginHorizontal: 6,
    fontSize: 14,
    color: "#AFA9A1",
  },
  profileBio: {
    fontSize: 13,
    color: "#8D8174",
    marginTop: 4,
    fontStyle: "italic",
  },

  /* 🔹 상단 필터 */
  filterBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: "#F3EFEA",
    marginHorizontal: 1, // ⭐ 간격 좁힘
  },
  filterButtonActive: {
    backgroundColor: "#FF7A00",
  },
  filterText: {
    fontSize: 13,
    color: "#6B5F52",
  },
  filterTextActive: {
    color: "#FFF",
    fontWeight: "700",
  },

  /* 🔹 피드 */
  feedCard: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 14,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  feedTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 8,
  },
  feedContent: {
    fontSize: 14,
    color: "#4F4F4F",
    marginBottom: 10,
  },

  /* 🔹 카테고리 태그 */
  categoryTag: {
    alignSelf: "flex-start",
    backgroundColor: "#FFEEE0",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  categoryTagText: {
    fontSize: 12,
    color: "#FF7A00",
    fontWeight: "600",
  },
});
