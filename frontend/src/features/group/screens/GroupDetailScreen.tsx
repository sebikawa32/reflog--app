import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { decode as base64_decode } from "base-64";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import { GroupDetailStyles as styles } from "../styles/GroupDetailStyles";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export default function GroupDetailScreen({ route, navigation }: any) {
    const { groupId } = route.params;

    const [group, setGroup] = useState<any>(null);
    const [feeds, setFeeds] = useState<any[]>([]);
    const [userId, setUserId] = useState<number | null>(null);
    const [isLeader, setIsLeader] = useState(false);

    useEffect(() => {
        loadUser();
    }, []);

    /** 🔥 JWT에서 userId 뽑기 */
    const loadUser = async () => {
        const token = await AsyncStorage.getItem("accessToken");
        if (!token) return;

        try {
            const payload = JSON.parse(
                base64_decode(token.split(".")[1].padEnd(4, "="))
            );

            const uid = payload.userId;
            setUserId(uid);

            loadDetail(uid);
            loadFeeds();
        } catch (e) {
            console.log("JWT decode error:", e);
        }
    };

    /** 🔥 그룹 상세 조회 */
    const loadDetail = async (uid: number) => {
        try {
            const res = await axios.get(`${BASE_URL}/api/groups/${groupId}`);
            const data = res.data;

            setGroup(data);

            // 리더 여부 판단
            if (data.leader?.id === uid) {
                setIsLeader(true);
            }

        } catch (e) {
            console.log("Group detail error:", e);
        }
    };

    /** 🔥 그룹 피드 목록 조회 */
    const loadFeeds = async () => {
        try {
            const token = await AsyncStorage.getItem("accessToken");

            const res = await axios.get(
                `${BASE_URL}/api/group-feed/${groupId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setFeeds(res.data);
        } catch (e) {
            console.log("Feed load error:", e);
        }
    };

    if (!group) return <Text>로딩중...</Text>;

    return (
        <View style={styles.container}>
            
            {/* 🔔 상단 오른쪽 - 리더만 수신함 버튼 보여주기 */}
            {isLeader && (
                <TouchableOpacity
                    style={{
                        position: "absolute",
                        right: 20,
                        top: 16,
                        zIndex: 10,
                    }}
                    onPress={() =>
                        navigation.navigate("GroupRequestInboxScreen", {
                            groupId,
                        })
                    }
                >
                    <Ionicons name="mail-outline" size={28} color="#FF7043" />
                </TouchableOpacity>
            )}

            <ScrollView>

                {/* 그룹 이름 */}
                <Text style={styles.title}>{group.groupName}</Text>

                {/* 그룹 설명 */}
                <Text style={styles.description}>{group.description}</Text>

                {/* 리더 정보 */}
                <Text style={styles.leaderText}>
                    리더: {group.leader?.nickname ?? "알 수 없음"}
                </Text>

                {/* 구분선 */}
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
                            <Text style={styles.feedDateText}>작성일: {feed.createdAt}</Text>
                        </TouchableOpacity>
                    ))
                )}
            </ScrollView>

            {/* 리더 전용 + 버튼 */}
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
