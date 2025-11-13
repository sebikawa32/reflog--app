import { StyleSheet } from "react-native";

export const ReviewWriteStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDFBF7",
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: "700",
    color: "#3B3025",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#4A4035",
  },
  categoryGroup: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  categoryButton: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#D5C7B3",
    backgroundColor: "#FFF",
  },
  categorySelected: {
    backgroundColor: "#C8A97E",
  },
  categoryText: {
    fontSize: 15,
    color: "#3B3025",
    fontWeight: "500",
  },
  categoryTextSelected: {
    color: "#FFF",
    fontWeight: "700",
  },
  input: {
    borderWidth: 1,
    borderColor: "#D5C7B3",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    backgroundColor: "#FFF",
    fontSize: 14,
  },
  starContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
    paddingVertical: 10,
  },
});
