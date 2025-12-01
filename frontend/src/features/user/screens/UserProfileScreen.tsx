import React, { useEffect, useState, useRef } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    SafeAreaView,
    Animated,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { userApi } from "../../../api/userApi";
import { postApi } from "../../../api/postApi";

const DEFAULT_PROFILE_IMG =
    "https://cdn-icons-png.flaticon.com/512/847/847969.png";

const categoryFilters = [
    { key: "all", label: "전체" },
    { key: "book", label: "책" },
    { key: "movie", label: "영화" },
    { key: "drama", label: "드라마" },
    { key: "animation", label: "애니" },
];

export default function UserProfileScreen() {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const { userId } = route.params;

    const [user, setUser] = useState<any>(null);
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isFollowing, setIsFollowing] = useState<boolean>(false);
    const [selectedFilter, setSelectedFilter] = useState("all");

    const scaleAnim = useRef(new Animated.Value(1)).current;

    const runFollowAnimation = () => {
        Animated.sequence([
            Animated.timing(scaleAnim, {
                toValue: 1.1,
                duration: 120,
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 120,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const loadProfile = async () => {
        try {
            const userInfo = await userApi.getUserById(userId);
            setUser(userInfo);
            setIsFollowing(userInfo.isFollowing);

            const userPosts = await postApi.getByUserId(userId);
            setPosts(userPosts);
        } catch (err) {
            console.log("❌ 프로필 로딩 실패:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProfile();
    }, []);

    const toggleFollow = async () => {
        try {
            setIsFollowing((prev) => !prev);
            runFollowAnimation();

            if (isFollowing) {
                await userApi.unfollow(userId);
            } else {
                await userApi.follow(userId);
            }

            setTimeout(() => {
                loadProfile();
            }, 250);
        } catch (err) {
            console.log("❌ 팔로우/언팔 실패:", err);
            setIsFollowing((prev) => !prev);
        }
    };

    if (loading || !user) {
        return (
            <View style={{ flex: 1, justifyContent: "center" }}>
                <ActivityIndicator size="large" color="#FF8F1F" />
            </View>
        );
    }

    /** 🔥 카테고리 필터 적용 */
    const filteredPosts =
        selectedFilter === "all"
            ? posts
            : posts.filter((p) => p.category === selectedFilter);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#FF8F1F" }}>
            <View style={{ flex: 1, backgroundColor: "#FF8F1F" }}>

                {/* 🔶 상단 프로필 영역 — 홈 완전 동일 */}
                <View
                    style={{
                        alignItems: "center",
                        paddingVertical: 30,
                        paddingHorizontal: 20,
                    }}
                >
                    <Image
                        source={{ uri: user.profileImage || DEFAULT_PROFILE_IMG }}
                        style={{
                            width: 90,
                            height: 90,
                            borderRadius: 45,
                            marginBottom: 12,
                        }}
                    />

                    <Text style={{ fontSize: 20, fontWeight: "700", color: "#FFFFFF" }}>
                        {user.nickname}
                    </Text>

                    <Text
                        style={{
                            fontSize: 14,
                            color: "#FFFFFF",
                            marginTop: 8,
                            textAlign: "center",
                        }}
                    >
                        {user.introduce || "소개글이 없습니다."}
                    </Text>

                    {/* 🔸 통계 */}
                    <View
                        style={{
                            flexDirection: "row",
                            marginTop: 18,
                        }}
                    >
                        <Text style={{ fontSize: 14, color: "#FFFFFF" }}>
                            감상 {posts.length}
                        </Text>

                        <Text style={{ marginHorizontal: 8, color: "#FFFFFF" }}>·</Text>

                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate("FollowList", {
                                    userId: user.id,
                                    type: "followers",
                                })
                            }
                        >
                            <Text style={{ fontSize: 14, color: "#FFFFFF" }}>
                                팔로워 {user.followerCount}
                            </Text>
                        </TouchableOpacity>

                        <Text style={{ marginHorizontal: 8, color: "#FFFFFF" }}>·</Text>

                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate("FollowList", {
                                    userId: user.id,
                                    type: "followings",
                                })
                            }
                        >
                            <Text style={{ fontSize: 14, color: "#FFFFFF" }}>
                                팔로잉 {user.followingCount}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* 🔸 팔로우 버튼 */}
                    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                        <TouchableOpacity
                            onPress={toggleFollow}
                            style={{
                                backgroundColor: isFollowing ? "#DDDDDD" : "#FFFFFF",
                                paddingVertical: 10,
                                paddingHorizontal: 24,
                                borderRadius: 12,
                                marginTop: 14,
                            }}
                        >
                            <Text
                                style={{
                                    color: isFollowing ? "#555" : "#FF8F1F",
                                    fontWeight: "600",
                                    fontSize: 15,
                                }}
                            >
                                {isFollowing ? "팔로잉" : "팔로우하기"}
                            </Text>
                        </TouchableOpacity>
                    </Animated.View>
                </View>

                {/* 🔶 아래 전체 흰색 페이지 */}
                <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>

                    {/* ⭐ 카테고리 필터(홈과 완전동일) */}
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            paddingHorizontal: 20,
                            paddingTop: 20,
                            paddingBottom: 14,
                            backgroundColor: "#FFFFFF",
                        }}
                    >
                        {categoryFilters.map((item) => (
                            <TouchableOpacity
                                key={item.key}
                                style={{
                                    paddingVertical: 8,
                                    paddingHorizontal: 14,
                                    borderRadius: 18,
                                    backgroundColor:
                                        selectedFilter === item.key
                                            ? "#FF8F1F"
                                            : "#F4F4F4",
                                }}
                                onPress={() => setSelectedFilter(item.key)}
                            >
                                <Text
                                    style={{
                                        fontSize: 14,
                                        fontWeight: "600",
                                        color:
                                            selectedFilter === item.key
                                                ? "#FFFFFF"
                                                : "#555",
                                    }}
                                >
                                    {item.label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* 제목 */}
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: "700",
                            marginLeft: 20,
                            marginBottom: 12,
                            color: "#333",
                        }}
                    >
                        감상 기록
                    </Text>

                    {/* 🔥 2열 리스트 */}
                    <FlatList
                        data={filteredPosts}
                        numColumns={2}
                        keyExtractor={(item) => item.postId.toString()}
                        columnWrapperStyle={{
                            justifyContent: "space-between",
                            paddingHorizontal: 16,
                        }}
                        contentContainerStyle={{ paddingBottom: 120 }}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() =>
                                    navigation.push("ReviewDetail", { review: item })
                                }
                                style={{
                                    width: "48%",
                                    backgroundColor: "white",
                                    borderRadius: 12,
                                    marginBottom: 16,
                                    padding: 12,
                                    shadowColor: "#000",
                                    shadowOpacity: 0.07,
                                    shadowRadius: 4,
                                    elevation: 1,
                                }}
                            >
                                {item.imageUrl && (
                                    <Image
                                        source={{ uri: item.imageUrl }}
                                        style={{
                                            width: "100%",
                                            height: 200,
                                            borderRadius: 8,
                                            marginBottom: 8,
                                        }}
                                    />
                                )}

                                <Text
                                    style={{
                                        fontSize: 15,
                                        fontWeight: "600",
                                        marginBottom: 6,
                                    }}
                                    numberOfLines={1}
                                >
                                    {item.title}
                                </Text>

                                <View style={{ flexDirection: "row", marginBottom: 6 }}>
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Text
                                            key={star}
                                            style={{
                                                fontSize: 16,
                                                color:
                                                    star <= (item.rating || 0)
                                                        ? "#FF3333"
                                                        : "#ccc",
                                                marginRight: 2,
                                            }}
                                        >
                                            ★
                                        </Text>
                                    ))}
                                </View>

                                <View
                                    style={{
                                        alignSelf: "flex-start",
                                        backgroundColor: "#F2F2F2",
                                        paddingHorizontal: 6,
                                        paddingVertical: 3,
                                        borderRadius: 6,
                                    }}
                                >
                                    <Text style={{ color: "#777", fontSize: 11 }}>
                                        {item.category}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}
