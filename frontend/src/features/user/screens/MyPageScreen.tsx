import React from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../../../navigation/RootNavigator"; // ✅ 추가
import { MyPageStyles as styles } from "../styles/MyPageStyles";

export default function MyPageScreen() {
  const { logout } = useAuth();

  const handleLogout = () => {
    Alert.alert("로그아웃", "정말 로그아웃 하시겠습니까?", [
      { text: "취소", style: "cancel" },
      {
        text: "확인",
        onPress: async () => {
          await logout(); // ✅ RootNavigator의 상태를 직접 변경
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://cdn-icons-png.flaticon.com/512/1077/1077012.png",
        }}
        style={styles.profileImage}
      />
      <Text style={styles.nickname}>여진</Text>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>로그아웃</Text>
      </TouchableOpacity>
    </View>
  );
}
