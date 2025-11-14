import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { decode as base64_decode } from "base-64";
import { GroupDetailStyles as styles } from "../styles/GroupDetailStyles";

const BASE_URL = "http://localhost:8080";

export default function GroupDetailScreen({ route }: any) {
    const { groupId } = route.params;

    const [group, setGroup] = useState<any>(null);
    const [userId, setUserId] = useState<number | null>(null);
    const [isJoined, setIsJoined] = useState(false);

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        const token = await AsyncStorage.getItem("accessToken");
        if (!token) return;

        try {
            const payload = JSON.parse(
                base64_decode(token.split(".")[1].padEnd(4, "="))
            );
            setUserId(payload.userId);

            loadDetail(payload.userId);
        } catch (e) {
            console.log("JWT decode error:", e);
        }
    };

    const loadDetail = async (uid: number) => {
        const res = await axios.get(`${BASE_URL}/api/groups/${groupId}`);
        const data = res.data;

        setGroup(data);

        const joined = data.members?.some(
            (m: any) => m.userId === uid || m.user?.id === uid
        );

        setIsJoined(joined);
    };

    const handleJoin = async () => {
        const token = await AsyncStorage.getItem("accessToken");
        if (!token || !userId) return;

        try {
            await axios.post(
                `${BASE_URL}/api/groups/${groupId}/join`,
                { userId: userId }, // ⭐ body에 userId 포함
                { headers: { Authorization: `Bearer ${token}` } }
            );

            loadDetail(userId);
        } catch (e) {
            console.log("Join error:", e);
        }
    };

    if (!group) return <Text>로딩중...</Text>;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{group.groupName}</Text>
            <Text style={styles.description}>{group.description}</Text>

            {!isJoined ? (
                <TouchableOpacity style={styles.joinButton} onPress={handleJoin}>
                    <Text style={styles.joinButtonText}>그룹 가입하기</Text>
                </TouchableOpacity>
            ) : (
                <Text style={styles.joinedText}>이미 가입한 그룹입니다.</Text>
            )}
        </View>
    );
}
