import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

import FeedStackNavigator from "./FeedStackNavigator";
import GroupStackNavigator from "./GroupStackNavigator";
import HomeStackNavigator from "./HomeStackNavigator";
import UserStackNavigator from "./UserStackNavigator"; // ⭐ MyPage 전용 스택

const Tab = createBottomTabNavigator();

export default function MainNavigator() {
    return (
        <Tab.Navigator
            initialRouteName="HomeTab"
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: "#FF7A00",
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
                tabBarIcon: ({ color }) => {
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

            {/* 🔥 Feed 전용 스택 */}
            <Tab.Screen
                name="Feed"
                component={FeedStackNavigator}
                options={{ title: "피드" }}
            />

            <Tab.Screen
                name="HomeTab"
                component={HomeStackNavigator}
                options={{ title: "홈" }}
            />

            <Tab.Screen
                name="Group"
                component={GroupStackNavigator}
                options={{ title: "그룹" }}
            />

            {/*  프로필 수정, 마이페이지 모두 UserStack에서 관리 */}
            <Tab.Screen
                name="MyPage"
                component={UserStackNavigator}
                options={{ title: "내정보" }}
            />
        </Tab.Navigator>
    );
}
