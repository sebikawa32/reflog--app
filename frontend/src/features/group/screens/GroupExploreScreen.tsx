import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { decode as base64_decode } from "base-64";
import React, { useEffect, useState } from "react";
import {
    FlatList,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

import { GroupExploreStyles as styles } from "../styles/GroupExploreStyles";

import { GroupStackParamList } from "@/navigation/types/navigation";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type ExploreNav = NativeStackNavigationProp<
    GroupStackParamList,
    "GroupExplore"
>;

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export default function GroupExploreScreen() {
    const navigation = useNavigation<ExploreNav>();
    const route = useRoute();

    const [userId, setUserId] = useState<number | null>(null);
    const [notJoined, setNotJoined] = useState<any[]>([]);
    const [search, setSearch] = useState("");

    // 첫 로드
    useEffect(() => {
        loadUser();
    }, []);

    // GroupCreate → refresh 적용
    useEffect(() => {
        if ((route.params as any)?.refresh) {
            loadUser();
        }
    }, [(route.params as any)?.refresh]);

    /** 사용자 정보 로드 */
    const loadUser = async () => {
        const token = await AsyncStorage.getItem("accessToken");
        if (!token) return;

        try {
            const payload = JSON.parse(
                base64_decode(token.split(".")[1].padEnd(4, "="))
            );

            const uid = payload.userId;
            setUserId(uid);

            loadGroups(uid, token);

        } catch (e) {
            console.log("JWT decode error:", e);
        }
    };

    /** 가입하지 않은 그룹 불러오기 */
    const loadGroups = async (uid: number, token: string) => {
        try {
            const res = await axios.get(`${BASE_URL}/api/groups/not-joined`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            console.log("notJoined Groups:", res.data);

            setNotJoined(res.data);

        } catch (e) {
            console.log("Group load error:", e);
        }
    };

    /** 검색 */
    const searchedGroups =
        search.trim() === ""
            ? notJoined
            : notJoined.filter((g) =>
                g.groupName.toLowerCase().includes(search.toLowerCase())
            );

    /** 가입 요청 */
    const handleJoin = async (groupId: number) => {
        const token = await AsyncStorage.getItem("accessToken");
        if (!token || !userId) return;

        try {
            await axios.post(
                `${BASE_URL}/api/groups/${groupId}/join-request`,
                { userId: userId }, // body
                { headers: { Authorization: `Bearer ${token}` } }
            );

            // 가입 요청 후 다시 목록 새로고침
            loadGroups(userId, token);

        } catch (e) {
            console.log("Join error:", e);
        }
    };

    /** 리스트 렌더링 */
    const renderItem = ({ item }: any) => {

        // ⭐ 백엔드에서 보내주는 joinedStatus 기반
        const joinedStatus = item.joinedStatus; // "NONE", "PENDING"
        const isPending = joinedStatus === "PENDING";

        return (
            <View style={styles.card}>
                <Text style={styles.name}>{item.groupName}</Text>
                <Text style={styles.desc}>{item.description}</Text>

                <Text style={styles.memberCount}>
                     {item.memberCount ?? 0}명 참여 중
                </Text>

                <TouchableOpacity
                    style={isPending ? styles.pendingButton : styles.joinButton}
                    onPress={() => !isPending && handleJoin(item.id)}
                >
                    <Text style={styles.joinButtonText}>
                        {isPending ? "요청 중" : "가입하기"}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="그룹 이름 검색"
                value={search}
                onChangeText={setSearch}
            />

            <Text style={styles.title}>가입하지 않은 그룹</Text>

            <FlatList
                data={searchedGroups}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>검색 결과가 없습니다.</Text>
                }
            />

            <TouchableOpacity
                style={styles.fab}
                onPress={() => navigation.navigate("GroupCreate")}
            >
                <Text style={styles.fabText}>＋</Text>
            </TouchableOpacity>
        </View>
    );
}
