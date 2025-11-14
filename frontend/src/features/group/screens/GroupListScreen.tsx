import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { decode as base64_decode } from "base-64";
import { GroupListStyles as styles } from "../styles/GroupListStyles";
import FloatingButton from "../components/FloatingButton";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;


export default function GroupListScreen() {
    const navigation = useNavigation<any>();

    const [myGroups, setMyGroups] = useState<any[]>([]);
    const [userId, setUserId] = useState<number | null>(null);

    // 🚀 로그인 후 userId 읽기
    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        const token = await AsyncStorage.getItem("accessToken");
        if (!token) return;

        try {
            // base64 decode
            const base64Url = token.split(".")[1];
            const padded = base64Url.padEnd(
                base64Url.length + (4 - (base64Url.length % 4)) % 4,
                "="
            );
            const jsonPayload = base64_decode(padded);
            const payload = JSON.parse(jsonPayload);

            console.log("🔥 JWT Payload:", payload);

            setUserId(payload.userId);
            loadGroups(payload.userId);
        } catch (e) {
            console.log("JWT decode error:", e);
        }
    };

    // 🚀 내가 가입한 그룹만 필터링
    const loadGroups = async (uid: number) => {
        try {
            const res = await axios.get(`${BASE_URL}/api/groups`);
            const data = res.data;

            console.log("🔥 서버에서 받은 groups:", data);

            // ⭐ members → m.user.id 로 접근해야 함
            const mine = data.filter((g: any) =>
                g.members?.some((m: any) => m.user?.id === uid)
            );

            console.log("🔥 내가 가입한 그룹:", mine);

            setMyGroups(mine);
        } catch (e) {
            console.log("Group load error:", e);
        }
    };

    const renderItem = ({ item }: any) => (
        <TouchableOpacity
            style={styles.groupCard}
            onPress={() => navigation.navigate("GroupDetail", { groupId: item.id })}
        >
            <Text style={styles.groupName}>{item.groupName}</Text>
            <Text style={styles.joined}>가입됨</Text>
        </TouchableOpacity>
    );

    if (userId === null) {
        return <Text>로딩중...</Text>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>내가 가입한 그룹</Text>

            <FlatList
                data={myGroups}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />

            <FloatingButton onPress={() => navigation.navigate("GroupExplore")} />
        </View>
    );
}
