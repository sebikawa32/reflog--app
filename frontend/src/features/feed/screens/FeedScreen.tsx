import React, { useEffect, useState } from "react";
import {
    View,
    FlatList,
    ActivityIndicator,
    Text,
    TouchableOpacity,
} from "react-native";
import { fetchFollowingFeed } from "../api/feedApi";
import FeedCard from "../components/FeedCard";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

/** 🔥 컴포넌트 렌더 체크 */
console.log("🔥 FeedScreen 파일 로드됨");

export default function FeedScreen() {
    const navigation = useNavigation<any>();

    const [feed, setFeed] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    /** ------------------------------------------------------
     *  🔥 내 프로필 불러오기 (403 문제 해결)
     * ------------------------------------------------------ */
    const loadMyProfile = async () => {
        try {
            const token = await AsyncStorage.getItem("accessToken");
            console.log("🔑 내 프로필 호출 시 사용 토큰:", token);

            if (!token) {
                console.log("⚠️ 토큰 없음 → 로그인 필요");
                return;
            }

            const res = await axios.get(
                `${process.env.EXPO_PUBLIC_API_URL}/api/users/me`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            console.log("👤 내 프로필 불러오기 성공:", res.data);
        } catch (err) {
            console.log("❌ 프로필 로딩 실패:", err);
        }
    };

    /** ------------------------------------------------------
     *  🔥 피드 불러오기
     * ------------------------------------------------------ */
    const loadFeed = async () => {
        console.log("🚀 loadFeed() 실행됨");

        try {
            const data = await fetchFollowingFeed();
            console.log("📌 fetchFollowingFeed() 반환:", data);
            setFeed(data);
        } catch (error) {
            console.log("❌ loadFeed() 에러:", error);
        } finally {
            setLoading(false);
            console.log("🔽 loading = false 로 설정됨");
        }
    };

    /** ------------------------------------------------------
     *  🔥 최초 실행
     * ------------------------------------------------------ */
    useEffect(() => {
        console.log("🔥 useEffect 실행 → loadMyProfile(), loadFeed() 호출");
        loadMyProfile();
        loadFeed();
    }, []);

    /** ------------------------------------------------------
     *  ⏳ 로딩중
     * ------------------------------------------------------ */
    if (loading) {
        console.log("⏳ 피드 로딩 중...");
        return (
            <View style={{ flex: 1, justifyContent: "center" }}>
                <ActivityIndicator size="large" color="#FF8F1F" />
            </View>
        );
    }

    /** ------------------------------------------------------
     *  🔶 상단 헤더
     * ------------------------------------------------------ */
    const Header = (
        <View style={{ backgroundColor: "#FF8F1F", paddingBottom: 30 }}>
            <View style={{ paddingTop: 70, paddingHorizontal: 22 }}>
                <Text style={{ fontSize: 22, fontWeight: "700", color: "#ffffff" }}>
                    유저를 찾아보세요
                </Text>
                <Text style={{ marginTop: 6, fontSize: 14, color: "#ffffff" }}>
                    새로운 사람을 팔로우하고 감상 기록을 만들어보세요!
                </Text>
            </View>

            {/* 검색창 */}
            <View style={{ paddingHorizontal: 20, marginTop: 25 }}>
                <TouchableOpacity
                    style={{
                        backgroundColor: "#FFFFFF",
                        paddingVertical: 16,
                        paddingHorizontal: 20,
                        borderRadius: 18,
                        shadowColor: "#000",
                        shadowOpacity: 0.08,
                        shadowRadius: 6,
                        elevation: 2,
                    }}
                    onPress={() => navigation.navigate("SearchUser")}
                >
                    <Text style={{ fontSize: 15, color: "#8A8A8A" }}>
                        유저 검색하기...
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    /** ------------------------------------------------------
     *  📭 팔로잉 없음 화면
     * ------------------------------------------------------ */
    if (feed.length === 0) {
        console.log("📭 feed.length === 0 → 팔로잉 없음 화면 출력");

        return (
            <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
                {Header}

                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        paddingHorizontal: 20,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 16,
                            color: "#777",
                            textAlign: "center",
                            lineHeight: 22,
                        }}
                    >
                        아직 팔로우한 사용자가 없어요.{"\n"}
                        유저를 팔로우하면 피드가 표시됩니다.
                    </Text>
                </View>
            </View>
        );
    }

    /** ------------------------------------------------------
     *  📌 피드 리스트
     * ------------------------------------------------------ */
    console.log("📌 feed.length:", feed.length);

    return (
        <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
            {Header}

            <FlatList
                data={feed}
                renderItem={({ item }) => <FeedCard item={item} />}
                keyExtractor={(item) => item.postId.toString()}
                contentContainerStyle={{ paddingBottom: 60 }}
            />
        </View>
    );
}
