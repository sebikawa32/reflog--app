import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { decode as base64_decode } from "base-64";
import React, { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { GroupCreateStyles as styles } from "../styles/GroupCreateStyles";

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
        if (!token) return;

        try {
            const payload = JSON.parse(
                base64_decode(token.split(".")[1].padEnd(4, "="))
            );
            const userId = payload.userId;

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

            /** ⭐ 여기에서 goBack()이 아니라 navigate()를 사용 */
            navigation.navigate("GroupHome");

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

            <TouchableOpacity style={styles.createButton} onPress={handleCreate}>
                <Text style={styles.createButtonText}>생성하기</Text>
            </TouchableOpacity>
        </View>
    );
}
