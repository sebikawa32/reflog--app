import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GroupCreateStyles as styles } from "../styles/GroupCreateStyles";
import { decode as base64_decode } from "base-64";

// ⭐ env 적용
const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export default function GroupCreateScreen({ navigation }: any) {
    const [groupName, setGroupName] = useState("");
    const [description, setDescription] = useState("");

    const handleCreate = async () => {
        if (!groupName.trim()) {
            Alert.alert("알림", "그룹 이름을 입력해 주세요.");
            return;
        }

        const token = await AsyncStorage.getItem("accessToken");
        if (!token) {
            Alert.alert("오류", "로그인이 필요합니다.");
            return;
        }

        try {
            // ⭐ JWT 에서 userId 꺼내기
            const payload = JSON.parse(
                base64_decode(token.split(".")[1].padEnd(4, "="))
            );
            const userId = payload.userId;

            // ⭐ 그룹 생성 요청
            await axios.post(
                `${BASE_URL}/api/groups/create`,
                {
                    groupName,
                    description,
                    leaderId: userId,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            Alert.alert("성공", "그룹이 생성되었습니다.");
            navigation.goBack();

        } catch (e) {
            console.log("Create error:", e);
            Alert.alert("오류", "그룹 생성 중 문제가 발생했습니다.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>그룹 생성하기</Text>

            <TextInput
                placeholder="그룹 이름"
                style={styles.input}
                value={groupName}
                onChangeText={setGroupName}
            />

            <TextInput
                placeholder="그룹 설명"
                style={styles.input}
                value={description}
                onChangeText={setDescription}
            />

            <TouchableOpacity
                style={styles.createButton}
                onPress={handleCreate}
            >
                <Text style={styles.createButtonText}>생성하기</Text>
            </TouchableOpacity>
        </View>
    );
}
