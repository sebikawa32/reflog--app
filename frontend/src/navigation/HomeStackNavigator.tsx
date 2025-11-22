import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeStackParamList } from "./types/navigation";

import HomeScreen from "../features/review/screens/HomeScreen";
import ReviewListScreen from "../features/review/screens/ReviewListScreen";
import ReviewDetailScreen from "../features/review/screens/ReviewDetailScreen";

// ✅ 피드 스크린 추가
import FeedScreen from "../features/feed/screens/FeedScreen";

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function HomeStackNavigator() {
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
                options={{ title: "리뷰 목록" }}
            />

            <Stack.Screen
                name="ReviewDetail"
                component={ReviewDetailScreen}
                options={{ title: "상세 보기" }}
            />

            {/* ✅ 팔로잉 피드 화면 */}
            <Stack.Screen
                name="Feed"
                component={FeedScreen}
                options={{ title: "팔로잉 피드" }}
            />
        </Stack.Navigator>
    );
}
