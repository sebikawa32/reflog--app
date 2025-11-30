import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeStackParamList } from "./types/navigation";

import HomeScreen from "../features/review/screens/HomeScreen";
import ReviewDetailScreen from "../features/review/screens/ReviewDetailScreen";
import ReviewWriteScreen from "../features/review/screens/ReviewWriteScreen";
import ReviewEditScreen from "../features/review/screens/ReviewEditScreen";

import FeedScreen from "../features/feed/screens/FeedScreen";
import FollowListScreen from "../features/user/screens/FollowListScreen";
import UserProfileScreen from "../features/user/screens/UserProfileScreen";
import SearchUserScreen from "../features/user/screens/SearchUserScreen";

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function HomeStackNavigator() {
    return (
        <Stack.Navigator
            screenOptions={({ navigation }: any) => ({
                headerShown: true,
                headerShadowVisible: false,
                headerBackVisible: false,

                // ⭐ 전체 헤더 색상 통일
                headerStyle: {
                    backgroundColor: "#FF8F1F",
                },
                headerTitleStyle: {
                    fontSize: 18,
                    fontWeight: "700",
                    color: "#FFFFFF",
                },

                // ⭐ 커스텀 뒤로가기 버튼
                headerLeft: () => (
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{ paddingHorizontal: 10 }}
                    >
                        <Text
                            style={{
                                fontSize: 26,
                                color: "#FFFFFF",
                                marginTop: -3,
                            }}
                        >
                            {"<"}
                        </Text>
                    </TouchableOpacity>
                ),
            })}
        >
            {/* 홈은 헤더 숨김 */}
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ headerShown: false }}
            />

            <Stack.Screen name="ReviewDetail" component={ReviewDetailScreen} options={{ title: "상세 보기" }} />
            <Stack.Screen name="ReviewWrite" component={ReviewWriteScreen} options={{ title: "리뷰 작성" }} />
            <Stack.Screen name="ReviewEdit" component={ReviewEditScreen} options={{ title: "리뷰 수정" }} />
            <Stack.Screen name="Feed" component={FeedScreen} options={{ title: "팔로잉 피드" }} />
            <Stack.Screen name="FollowList" component={FollowListScreen} options={{ title: "팔로우 목록" }} />
            <Stack.Screen name="UserProfile" component={UserProfileScreen} options={{ title: "유저 프로필" }} />

            {/* 검색은 네이티브 헤더 X */}
            <Stack.Screen
                name="SearchUser"
                component={SearchUserScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}
