import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { decode as base64_decode } from "base-64";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { GroupDetailStyles as styles } from "../styles/GroupDetailStyles";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

/** 🔥 Base64URL → Base64로 변환 (패딩 적용) */
function fixBase64(base64Url: string) {
    base64Url = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    while (base64Url.length % 4 !== 0) {
        base64Url += "=";
    }
    return base64Url;
}

export default function GroupDetailScreen({ route, navigation }: any) {
    const { groupId } = route.params;

    const [group, setGroup] = useState<any>(null);
    const [feeds, setFeeds] = useState<any[]>([]);
    const [userId, setUserId] = useState<number | null>(null);
    const [isLeader, setIsLeader] = useState(false);

    useEffect(() => {
        init();
    }, []);

    /** 🔥 첫 실행 : JWT → userId 디코딩 후 API 호출 */
    const init = async () => {
        try {
            const token = await AsyncStorage.getItem("accessToken");
            if (!token) return;

            const base64Payload = fixBase64(token.split(".")[1]);
            const payload = JSON.parse(base64_decode(base64Payload));

            const uid = payload.userId;
            setUserId(uid);

            await Promise.all([
                loadGroupDetail(uid),
                loadFeeds(),
            ]);
        } catch (e) {
            console.log("🔥 JWT decode error", e);
        }
    };

    /** 🔥 그룹 상세 조회 (이제 토큰 포함 + 403 핸들링 추가됨) */
    const loadGroupDetail = async (uid: number) => {
        try {
            const token = await AsyncStorage.getItem("accessToken");

            const res = await axios.get(
                `${BASE_URL}/api/groups/${groupId}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            const data = res.data;
            setGroup(data);

            // 리더 여부 체크
            if (data.leader?.id === uid) {
                setIsLeader(true);
            }

        } catch (e: any) {
            console.log("🔥 Group detail load error:", e);

            if (e.response?.status === 403) {
                await AsyncStorage.removeItem("accessToken");
                navigation.reset({
                    index: 0,
                    routes: [{ name: "Auth" }],
                });
            }
        }
    };

    /** 🔥 그룹의 피드 목록 조회 */
    const loadFeeds = async () => {
        try {
            const token = await AsyncStorage.getItem("accessToken");

            const res = await axios.get(
                `${BASE_URL}/api/group-feed/${groupId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setFeeds(res.data);

        } catch (e: any) {
            console.log("🔥 Feed load error:", e);

            if (e.response?.status === 403) {
                await AsyncStorage.removeItem("accessToken");
                navigation.reset({
                    index: 0,
                    routes: [{ name: "Auth" }],
                });
            }
        }
    };

    /** 로딩 화면 */
    if (!group) return <Text>로딩중...</Text>;

    return (
        <View style={styles.container}>
            {/* 🔔 리더 전용 메일 아이콘 */}
            {isLeader && (
                <TouchableOpacity
                    style={{
                        position: "absolute",
                        right: 20,
                        top: 16,
                        zIndex: 10,
                    }}
                    onPress={() =>
                        navigation.navigate("GroupRequestInboxScreen", { groupId })
                    }
                >
                    <Ionicons name="mail-outline" size={28} color="#FF7043" />
                </TouchableOpacity>
            )}

            <ScrollView>
                {/* 그룹 이름 */}
                <Text style={styles.title}>{group.groupName}</Text>

                {/* 설명 */}
                <Text style={styles.description}>{group.description}</Text>

                {/* 리더 표시 */}
                <Text style={styles.leaderText}>
                    리더: {group.leader?.nickname ?? "알 수 없음"}
                </Text>

                <View style={styles.divider} />

                {/* 그룹 피드 목록 */}
                {feeds.length === 0 ? (
                    <View style={styles.emptyFeedContainer}>
                        <Text style={styles.emptyFeedText}>아직 피드가 없어요 😢</Text>
                    </View>
                ) : (
                    feeds.map((feed) => (
                        <TouchableOpacity
                            key={feed.id}
                            style={styles.feedCard}
                            onPress={() =>
                                navigation.navigate("FeedDetail", { feedId: feed.id })
                            }
                        >
                            <Text style={styles.feedTitleText}>{feed.title}</Text>
                            <Text style={styles.feedDateText}>
                                작성일: {feed.createdAt}
                            </Text>
                        </TouchableOpacity>
                    ))
                )}
            </ScrollView>

            {/* 🔥 리더 전용 + 버튼 */}
            {isLeader && (
                <TouchableOpacity
                    style={styles.fab}
                    onPress={() =>
                        navigation.navigate("GroupFeedCreate", {
                            groupId,
                            leaderId: userId,
                        })
                    }
                >
                    <Text style={styles.fabText}>＋</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}
