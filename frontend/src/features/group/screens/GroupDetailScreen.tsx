import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { decode as base64_decode } from "base-64";
import React, { useCallback, useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { GroupDetailStyles as styles } from "../styles/GroupDetailStyles";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

/** Base64URL → Base64 변환 */
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

    /** 🔥 JWT 디코드 후 첫 초기화 */
    useEffect(() => {
        init();
    }, []);

    const init = async () => {
        try {
            const token = await AsyncStorage.getItem("accessToken");
            if (!token) return;

            const base64Payload = fixBase64(token.split(".")[1]);
            const payload = JSON.parse(base64_decode(base64Payload));

            const uid = payload.userId;
            setUserId(uid);

            await Promise.all([loadGroupDetail(uid), loadFeeds()]);
        } catch (e) {
            console.log("🔥 JWT decode error", e);
        }
    };

    /** 🔄 화면 다시 포커스될 때 자동 새로고침 */
    useFocusEffect(
        useCallback(() => {
            if (userId) {
                loadGroupDetail(userId);
                loadFeeds();
            }
        }, [userId])
    );

    /** 그룹 상세 조회 */
    const loadGroupDetail = async (uid: number) => {
        try {
            const token = await AsyncStorage.getItem("accessToken");

            const res = await axios.get(`${BASE_URL}/api/groups/${groupId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = res.data;
            setGroup(data);

            setIsLeader(data.leader?.id === uid);
        } catch (e: any) {
            console.log("🔥 Group detail load error:", e);

            if (e.response?.status === 403) {
                await AsyncStorage.removeItem("accessToken");
                navigation.reset({ index: 0, routes: [{ name: "Auth" }] });
            }
        }
    };

    /** 그룹 피드 목록 조회 */
    const loadFeeds = async () => {
        try {
            const token = await AsyncStorage.getItem("accessToken");

            const res = await axios.get(`${BASE_URL}/api/group-feed/${groupId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setFeeds(res.data);
        } catch (e: any) {
            console.log("🔥 Feed load error:", e);

            if (e.response?.status === 403) {
                await AsyncStorage.removeItem("accessToken");
                navigation.reset({ index: 0, routes: [{ name: "Auth" }] });
            }
        }
    };

    if (!group) return <Text>로딩중...</Text>;

    return (
        <View style={styles.container}>
            {/* 리더 전용 요청함 버튼 */}
            {isLeader && (
                <TouchableOpacity
                    style={{ position: "absolute", right: 20, top: 16, zIndex: 10 }}
                    onPress={() =>
                        navigation.navigate("GroupRequestInboxScreen", { groupId })
                    }
                >
                    <Ionicons name="mail-outline" size={28} color="#FF7043" />
                </TouchableOpacity>
            )}

            <ScrollView>
                <Text style={styles.title}>{group.groupName}</Text>
                <Text style={styles.description}>{group.description}</Text>

                <Text style={styles.leaderText}>
                    리더: {group.leader?.nickname ?? "알 수 없음"}
                </Text>

                <View style={styles.divider} />

                {/* 피드 목록 */}
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

            {/* 리더 전용 + 버튼 */}
            {isLeader && (
                <TouchableOpacity
                    style={styles.fab}
                    onPress={() =>
                        navigation.navigate("GroupFeedCreate", { groupId, leaderId: userId })
                    }
                >
                    <Text style={styles.fabText}>＋</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}
