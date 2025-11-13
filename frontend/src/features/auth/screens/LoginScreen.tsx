import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../../navigation/RootNavigator"; // ✅ RootNavigator에서 가져오기
import { LoginStyles as styles } from "../styles/LoginStyles";

export default function LoginScreen({ navigation }: any) {
  const API_URL = process.env.EXPO_PUBLIC_API_URL;
  const { refreshLoginState } = useAuth(); // ✅ 로그인 상태 갱신 함수
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("입력 오류", "이메일과 비밀번호를 모두 입력해주세요.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password,
      });

      const { accessToken } = res.data;
      await AsyncStorage.setItem("accessToken", accessToken);

      // ✅ RootNavigator에 로그인 상태 갱신 알리기
      await refreshLoginState();

      Alert.alert("로그인 성공", "Reflog에 오신 걸 환영합니다 ✨");

      // RootNavigator가 isLoggedIn 상태 감지 후 자동으로 MainNavigator 전환
    } catch (error) {
      console.error("❌ 로그인 실패:", error);
      Alert.alert("로그인 실패", "이메일 또는 비밀번호를 확인해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
        >
          {/* 상단 헤더 */}
          <View style={styles.headerContainer}>
            <Text style={styles.appTitle}>Reflog</Text>
            <Text style={styles.subtitle}>감상을 기록하고 공유하세요 📖</Text>
          </View>

          {/* 입력 폼 */}
          <View style={styles.form}>
            {/* 이메일 */}
            <TextInput
              style={styles.input}
              placeholder="이메일"
              placeholderTextColor="#A0A0A0"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            {/* 비밀번호 + 아이콘 한 줄 */}
            <View style={styles.passwordContainer}>
              <TextInput
                style={[
                  styles.input,
                  { flex: 1, marginBottom: 0, borderWidth: 0, paddingRight: 10 },
                ]}
                placeholder="비밀번호"
                placeholderTextColor="#A0A0A0"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword((prev) => !prev)}>
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={22}
                  color="#8A8A8A"
                />
              </TouchableOpacity>
            </View>

            {/* 로그인 버튼 */}
            <TouchableOpacity
              style={styles.loginButton}
              onPress={handleLogin}
              activeOpacity={0.8}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <Text style={styles.loginButtonText}>로그인</Text>
              )}
            </TouchableOpacity>
          </View>

          {/* 회원가입 연결 */}
          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>계정이 없으신가요?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
              <Text style={styles.signupLink}> 회원가입</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
