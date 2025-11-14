import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import GroupListScreen from "../features/group/screens/GroupListScreen";
import GroupExploreScreen from "../features/group/screens/GroupExploreScreen";
import GroupCreateScreen from "../features/group/screens/GroupCreateScreen";
import GroupDetailScreen from "../features/group/screens/GroupDetailScreen";

import { GroupStackParamList } from "../navigation/types/navigation";

const Stack = createNativeStackNavigator<GroupStackParamList>();

export default function GroupStackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="GroupHome"
                component={GroupListScreen}
                options={{ title: "그룹" }}
            />

            <Stack.Screen
                name="GroupExplore"
                component={GroupExploreScreen}
                options={{ title: "그룹 찾기" }}
            />

            <Stack.Screen
                name="GroupCreate"
                component={GroupCreateScreen}
                options={{ title: "새 그룹 만들기" }}
            />

            <Stack.Screen
                name="GroupDetail"
                component={GroupDetailScreen}
                options={{ title: "그룹 상세" }}
            />
        </Stack.Navigator>
    );
}
