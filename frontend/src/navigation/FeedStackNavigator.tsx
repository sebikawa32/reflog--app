import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import FeedScreen from "../features/feed/screens/FeedScreen";
import SearchUserScreen from "../features/user/screens/SearchUserScreen";
import UserProfileScreen from "../features/user/screens/UserProfileScreen";
import ReviewDetailScreen from "../features/review/screens/ReviewDetailScreen";

const Stack = createNativeStackNavigator();

export default function FeedStackNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: "#FF8F1F" },
                headerTintColor: "#FFFFFF",
                headerTitleStyle: { color: "#FFFFFF" },
                // ❌ headerBackTitleVisible 제거 (지원 안 됨)
            }}
        >
            {/* 🔶 Feed 홈은 이전 타이틀이 되므로 title 비우기 */}
            <Stack.Screen
                name="FeedHome"
                component={FeedScreen}
                options={{
                    headerShown: false,
                    title: "",           // ← 뒤로가기 글씨 없애는 핵심
                }}
            />

            <Stack.Screen
                name="SearchUser"
                component={SearchUserScreen}
                options={{
                    title: "유저 검색",
                }}
            />

            <Stack.Screen
                name="UserProfile"
                component={UserProfileScreen}
                options={{
                    title: "유저 프로필",
                }}
            />

            <Stack.Screen
                name="ReviewDetail"
                component={ReviewDetailScreen}
                options={{
                    title: "리뷰 상세",
                }}
            />
        </Stack.Navigator>
    );
}
