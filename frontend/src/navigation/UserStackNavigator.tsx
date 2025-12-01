import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import MyPageScreen from "../features/user/screens/MyPageScreen";
import ProfileEditScreen from "../features/user/screens/ProfileEditScreen";

import { UserStackParamList } from "../navigation/types/navigation";

const Stack = createNativeStackNavigator<UserStackParamList>();

export default function UserStackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="MyPageHome"
                component={MyPageScreen}
                options={{ title: "내 정보" }}
            />

            <Stack.Screen
                name="ProfileEdit"
                component={ProfileEditScreen}
                options={{ title: "프로필 수정" }}
            />
        </Stack.Navigator>
    );
}
