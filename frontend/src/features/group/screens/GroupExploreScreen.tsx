import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { decode as base64_decode } from "base-64";

import { GroupExploreStyles as styles } from "../styles/GroupExploreStyles";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { GroupStackParamList } from "@/navigation/types/navigation";

// 네비게이션 타입 정의
type ExploreNav = NativeStackNavigationProp<
    GroupStackParamList,
    "GroupExplore"
>;

// ⭐ 환경변수 기반 (필수)
const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export default function GroupExploreScreen() {
    const navigation = useNavigation<ExploreNav>();

    const [userId, setUserId] = useState<number | null>(null);
    const [groups, setGroups] = useState<any[]>([]);
    const [notJoined, setNotJoined] = useState<any[]>([]);

    useEffect(() => {
        loadUser();
    }, []);

    // 사용자 ID 로드 + group 불러오기
    const loadUser = async () => {
        const token = await AsyncStorage.getItem("accessToken");
        if (!token) return;

        try {
            const payload = JSON.parse(
                base64_decode(token.split(".")[1].padEnd(4, "="))
            );

            const uid = payload.userId;
            setUserId(uid);
            loadGroups(uid);

        } catch (e) {
            console.log("JWT decode error:", e);
        }
    };

    // 전체 그룹 가져와서 미가입 그룹 필터링
    const loadGroups = async (uid: number) => {
        try {
            const res = await axios.get(`${BASE_URL}/api/groups`);
            const data = res.data;

            setGroups(data);

            const filtered = data.filter(
                (g: any) =>
                    !g.members?.some((m: any) => m.user?.id === uid)
            );

            setNotJoined(filtered);
        } catch (e) {
            console.log("Group load error:", e);
        }
    };

    // 그룹 가입
    const handleJoin = async (groupId: number) => {
        const token = await AsyncStorage.getItem("accessToken");
        if (!token || !userId) return;

        try {
            await axios.post(
                `${BASE_URL}/api/groups/${groupId}/join`,
                { userId: userId },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            loadGroups(userId);
        } catch (e) {
            console.log("Join error:", e);
        }
    };

    const renderItem = ({ item }: any) => (
        <View style={styles.card}>
            <Text style={styles.name}>{item.groupName}</Text>
            <Text style={styles.desc}>{item.description}</Text>

            <TouchableOpacity
                style={styles.joinButton}
                onPress={() => handleJoin(item.id)}
            >
                <Text style={styles.joinButtonText}>가입하기</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>가입하지 않은 그룹</Text>

            <FlatList
                data={notJoined}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />

            {/* ➕ 오른쪽 하단 플로팅 버튼 */}
            <TouchableOpacity
                style={styles.fab}
                onPress={() => navigation.navigate("GroupCreate")}
            >
                <Text style={styles.fabText}>＋</Text>
            </TouchableOpacity>
        </View>
    );
}
