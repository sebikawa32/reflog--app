import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeStackParamList } from "./types/navigation";

import HomeScreen from "../features/review/screens/HomeScreen";
import ReviewDetailScreen from "../features/review/screens/ReviewDetailScreen";
import ReviewWriteScreen from "../features/review/screens/ReviewWriteScreen";
import ReviewEditScreen from "../features/review/screens/ReviewEditScreen";

// 팔로잉 피드
import FeedScreen from "../features/feed/screens/FeedScreen";

// ⭐ 팔로워 / 팔로잉 목록 화면 추가
import FollowListScreen from "../features/user/screens/FollowListScreen";

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function HomeStackNavigator() {
    return (
        <Stack.Navigator>
            {/* 홈 */}
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ headerShown: false }}
            />

            {/* 상세 */}
            <Stack.Screen
                name="ReviewDetail"
                component={ReviewDetailScreen}
                options={{ title: "상세 보기" }}
            />

            {/* 작성 */}
            <Stack.Screen
                name="ReviewWrite"
                component={ReviewWriteScreen}
                options={{ title: "리뷰 작성" }}
            />

            {/* 수정 */}
            <Stack.Screen
                name="ReviewEdit"
                component={ReviewEditScreen}
                options={{ title: "리뷰 수정" }}
            />

            {/* 피드 */}
            <Stack.Screen
                name="Feed"
                component={FeedScreen}
                options={{ title: "팔로잉 피드" }}
            />

            {/* ⭐ 팔로워 / 팔로잉 목록 */}
            <Stack.Screen
                name="FollowList"
                component={FollowListScreen}
                options={{ title: "팔로우 목록" }}
            />
        </Stack.Navigator>
    );
}
