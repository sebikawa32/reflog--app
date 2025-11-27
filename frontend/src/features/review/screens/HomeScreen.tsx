import React, { useCallback, useState } from "react";
import {
    SafeAreaView,
    Text,
    View,
    FlatList,
    Image,
    TouchableOpacity,
} from "react-native";
import { HomeStyles as styles } from "../styles/HomeStyles";
import { userApi } from "../../../api/userApi";
import { postApi } from "../../../api/postApi";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

const DEFAULT_PROFILE_IMG =
    "https://cdn-icons-png.flaticon.com/512/847/847969.png";

const categoryFilters = [
    { key: "all", label: "전체" },
    { key: "book", label: "책" },
    { key: "movie", label: "영화" },
    { key: "drama", label: "드라마" },
    { key: "animation", label: "애니" },
];

const HomeScreen = () => {
    const navigation = useNavigation<any>();

    // 🔥 네비게이션 상태 로그
    console.log("[NAVIGATION STATE]", navigation.getState());

    const [user, setUser] = useState<any>(null);
    const [posts, setPosts] = useState<any[]>([]);
    const [selectedFilter, setSelectedFilter] = useState("all");

    const loadHome = async () => {
        try {
            const myInfo = await userApi.getMyInfo();
            setUser(myInfo);

            const myPosts = await postApi.getByUserId(myInfo.id);
            setPosts(myPosts);

            console.log("✔ HomeScreen 로딩 성공");
        } catch (err) {
            console.log("❌ HomeScreen 로딩 실패:", err);
        }
    };

    // 화면 다시 열릴 때마다 새로고침
    useFocusEffect(
        useCallback(() => {
            loadHome();
        }, [])
    );

    if (!user) return null;

    const filteredPosts =
        selectedFilter === "all"
            ? posts
            : posts.filter((p) => p.category === selectedFilter);

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flex: 1 }}>
                {/* 🔹 프로필 */}
                <View style={[styles.profileContainer, { elevation: 0, shadowOpacity: 0 }]}>
                    <Image
                        source={{ uri: user.profileImage || DEFAULT_PROFILE_IMG }}
                        style={styles.profileImage}
                    />

                    <Text style={styles.profileName}>{user.nickname}</Text>

                    <View style={styles.statsContainer}>
                        <Text style={styles.statsText}>감상기록 {posts.length}</Text>
                        <Text style={styles.dot}>·</Text>
                        <Text style={styles.statsText}>팔로워 {user.followerCount}</Text>
                        <Text style={styles.dot}>·</Text>
                        <Text style={styles.statsText}>팔로잉 {user.followingCount}</Text>
                    </View>

                    <Text style={styles.profileBio}>
                        {user.introduce || "아직 소개가 없어요"}
                    </Text>
                </View>

                {/* 🔹 카테고리 필터 */}
                <View style={styles.filterBar}>
                    {categoryFilters.map((item) => (
                        <TouchableOpacity
                            key={item.key}
                            style={[
                                styles.filterButton,
                                selectedFilter === item.key && styles.filterButtonActive,
                            ]}
                            onPress={() => {
                                console.log("카테고리 선택:", item.key);
                                setSelectedFilter(item.key);
                            }}
                        >
                            <Text
                                style={[
                                    styles.filterText,
                                    selectedFilter === item.key && styles.filterTextActive,
                                ]}
                            >
                                {item.label}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* 🔹 게시글 리스트 */}
                <FlatList
                    style={{ flex: 1 }}
                    data={filteredPosts}
                    keyExtractor={(item) => item.postId.toString()}
                    contentContainerStyle={{ paddingBottom: 120 }}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => {
                                console.log("🔥 카드 눌림:", item.postId);
                                navigation.push("ReviewDetail", { review: item });
                            }}
                        >
                            <View style={[styles.feedCard, { elevation: 0, shadowOpacity: 0 }]}>
                                <Text style={styles.feedTitle}>{item.title}</Text>
                                <Text style={styles.feedContent}>{item.content}</Text>

                                {item.imageUrl && (
                                    <Image
                                        source={{ uri: item.imageUrl }}
                                        style={{ width: 120, height: 120, borderRadius: 8 }}
                                    />
                                )}

                                <View style={styles.categoryTag}>
                                    <Text style={styles.categoryTagText}>
                                        {item.category}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                    ListEmptyComponent={
                        <View style={{ paddingVertical: 40, alignItems: "center" }}>
                            <Text style={{ fontSize: 16, color: "#888" }}>
                                아직 작성한 게시글이 없어요
                            </Text>
                        </View>
                    }
                />

                {/* 🔹 플로팅 버튼 */}
                <TouchableOpacity
                    style={[styles.fab, { zIndex: 1 }]}
                    onPress={() => {
                        console.log("🔥 리뷰 작성 버튼 클릭");
                        navigation.navigate("ReviewWrite");
                    }}
                >
                    <Text style={styles.fabText}>＋</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;
