import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

// --- 화면 import ---
import FeedScreen from "../features/feed/screens/FeedScreen";
import GroupScreen from "../features/group/screens/GroupScreen";
import HomeScreen from "../features/review/screens/HomeScreen";
import ReviewDetailScreen from "../features/review/screens/ReviewDetailScreen";
import ReviewListScreen from "../features/review/screens/ReviewListScreen";
import MyPageScreen from "../features/user/screens/MyPageScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// ✅ 홈 탭 내부 스택 (리뷰 상세 이동 가능)
function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ReviewList"
        component={ReviewListScreen}
        options={{
          headerShown: true,
          title: "리뷰 목록",
          headerTintColor: "#2F2B28",
          headerStyle: { backgroundColor: "#FFFFFF" },
          headerTitleStyle: { fontWeight: "600" },
        }}
      />
      <Stack.Screen
        name="ReviewDetail"
        component={ReviewDetailScreen}
        options={{
          headerShown: true,
          title: "상세 보기",
          headerTintColor: "#2F2B28",
          headerStyle: { backgroundColor: "#FFFFFF" },
          headerTitleStyle: { fontWeight: "600" },
        }}
      />
    </Stack.Navigator>
  );
}

// ✅ 하단 탭 네비게이터
export default function MainNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#FF7A00", // 🍊 오렌지 포인트
        tabBarInactiveTintColor: "#B0B0B0",
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopWidth: 0.4,
          borderTopColor: "#E6E6E6",
          height: 65,
          shadowColor: "#000",
          shadowOpacity: 0.06,
          shadowRadius: 5,
          elevation: 2,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "home-outline";

          switch (route.name) {
            case "Feed":
              iconName = "newspaper-outline";
              break;
            case "HomeTab":
              iconName = "home-outline";
              break;
            case "Group":
              iconName = "people-outline";
              break;
            case "MyPage":
              iconName = "person-circle-outline";
              break;
          }

          return <Ionicons name={iconName} size={24} color={color} />;
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
          marginBottom: 4,
        },
      })}
    >
      <Tab.Screen
        name="Feed"
        component={FeedScreen}
        options={{ title: "피드" }}
      />
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{ title: "홈" }}
      />
      <Tab.Screen
        name="Group"
        component={GroupScreen}
        options={{ title: "그룹" }}
      />
      <Tab.Screen
        name="MyPage"
        component={MyPageScreen}
        options={{ title: "내정보" }}
      />
    </Tab.Navigator>
  );
}
