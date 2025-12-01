import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { createContext, useContext, useEffect, useState } from "react";
import { AppState } from "react-native";

import AuthNavigator from "./AuthNavigator";
import MainNavigator from "./MainNavigator";

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

// ✅ 전역 AuthContext
export const AuthContext = createContext({
  logout: async () => {},
  refreshLoginState: async () => {},
});

export default function RootNavigator() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [fontsLoaded] = useFonts({
    Ionicons: require("@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.ttf"),
  });

  // 로그인 여부 체크
  const checkLoginStatus = async () => {
    const token = await AsyncStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
  };

  // 앱 시작 시 1회 체크
  useEffect(() => {
    checkLoginStatus();
  }, []);

  // 앱 포그라운드 복귀 시 로그인 상태 새로고침
  useEffect(() => {
    const subscription = AppState.addEventListener("change", (state) => {
      if (state === "active") {
        checkLoginStatus();
      }
    });
    return () => subscription.remove();
  }, []);

  // 폰트 로딩 후 스플래시 종료
  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded || isLoggedIn === null) return null;

  // 로그아웃
  const logout = async () => {
    await AsyncStorage.removeItem("accessToken");
    setIsLoggedIn(false);
  };

  return (
      <AuthContext.Provider value={{ logout, refreshLoginState: checkLoginStatus }}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>

            {isLoggedIn ? (
                <Stack.Screen name="Main" component={MainNavigator} />
            ) : (
                <Stack.Screen name="Auth" component={AuthNavigator} />
            )}

          </Stack.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
  );
}

// 헬퍼 훅
export const useAuth = () => useContext(AuthContext);
