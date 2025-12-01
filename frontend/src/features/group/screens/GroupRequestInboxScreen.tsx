import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
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
    const isFocused = useIsFocused();

    /** 화면에 들어올 때마다 자동 새로고침 */
    useEffect(() => {
        loadUser();
    }, [isFocused]);

    /** JWT → userId 읽기 */
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

    /** 그룹 상세 */
    const loadDetail = async (uid: number) => {
        try {
            const res = await axios.get(`${BASE_URL}/api/groups/${groupId}`);
            const data = res.data;

            setGroup(data);

            if (data.leader?.id === uid) {
                setIsLeader(true);
            }
        } catch (e) {
            console.log("Group detail error:", e);
        }
    };

    /** 그룹 피드 목록 */
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
            <ScrollView>

                {/* 그룹 이름 */}
                <Text style={styles.title}>{group.groupName}</Text>

                {/* 그룹 설명 */}
                <Text style={styles.description}>{group.description}</Text>

                {/* 리더 정보 + 수신함 버튼 */}
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 16,
                    }}
                >
                    <Text style={styles.leaderText}>
                        리더: {group.leader?.nickname ?? "알 수 없음"}
                    </Text>

                    {/* ⭐ 리더만 보이는 수신함 버튼 */}
                    {isLeader && (
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate("GroupRequestInbox", {
                                    groupId,
                                })
                            }
                            style={{
                                backgroundColor: "#FF7A00",
                                paddingVertical: 6,
                                paddingHorizontal: 12,
                                borderRadius: 8,
                            }}
                        >
                            <Text
                                style={{
                                    color: "#fff",
                                    fontWeight: "700",
                                }}
                            >
                                수신함
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>

                <View style={styles.divider} />

                {/* 피드 목록 */}
                {feeds.length === 0 ? (
                    <View style={styles.emptyFeedContainer}>
                        <Text style={styles.emptyFeedText}>
                            아직 피드가 없어요 😢
                        </Text>
                    </View>
                ) : (
                    feeds.map((feed) => (
                        <TouchableOpacity
                            key={feed.id}
                            style={styles.feedCard}
                            onPress={() =>
                                navigation.navigate("FeedDetail", {
                                    feedId: feed.id,
                                })
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

            {/* 리더만 보이는 + 버튼 */}
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
