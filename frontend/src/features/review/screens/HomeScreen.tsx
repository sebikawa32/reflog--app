import React, { useCallback, useState } from "react";
import {
    SafeAreaView,
    Text,
    View,
    FlatList,
    Image,
    TouchableOpacity,
    Modal,
    TextInput,
    Button,
    ScrollView,
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

    const [user, setUser] = useState<any>(null);
    const [posts, setPosts] = useState<any[]>([]);
    const [selectedFilter, setSelectedFilter] = useState("all");

    const [editModalVisible, setEditModalVisible] = useState(false);
    const [introduceText, setIntroduceText] = useState("");

    const loadHome = async () => {
        try {
            const myInfo = await userApi.getMyInfo();
            setUser(myInfo);

            setIntroduceText(myInfo.introduce || "");

            const myPosts = await postApi.getByUserId(myInfo.id);
            setPosts(myPosts);
        } catch (err) {
            console.log("❌ HomeScreen 로딩 실패:", err);
        }
    };

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

    const saveIntroduce = async () => {
        try {
            await userApi.updateIntroduce(introduceText);
            setEditModalVisible(false);
            loadHome();
        } catch (err) {
            console.log("❌ 소개글 업데이트 실패:", err);
        }
    };

    const openIntroduceEditor = () => {
        setIntroduceText(user.introduce || "");
        setEditModalVisible(true);
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#FF8F1F" }}>
            <View style={{ flex: 1, backgroundColor: "#FF8F1F" }}>

                {/* 프로필 */}
                <View
                    style={{
                        alignItems: "center",
                        paddingVertical: 30,
                        paddingHorizontal: 20,
                    }}
                >
                    <Image
                        source={{ uri: user.profileImage || DEFAULT_PROFILE_IMG }}
                        style={styles.profileImage}
                    />

                    <Text style={{ fontSize: 20, fontWeight: "700", color: "#FFFFFF" }}>
                        {user.nickname}
                    </Text>

                    <TouchableOpacity onPress={openIntroduceEditor}>
                        <Text
                            style={{
                                fontSize: 14,
                                color: "#FFFFFF",
                                marginTop: 8,
                                textAlign: "center",
                            }}
                        >
                            {user.introduce || "아직 소개가 없어요 (눌러서 작성)"}
                        </Text>
                    </TouchableOpacity>

                    {/* 통계 */}
                    <View
                        style={{
                            flexDirection: "row",
                            marginTop: 18,
                        }}
                    >
                        <Text style={{ fontSize: 14, color: "#FFFFFF" }}>
                            감상기록 {posts.length}
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
                </View>

                {/* 카테고리 */}
                <View
                    style={{
                        backgroundColor: "#F8F8F8",
                        paddingVertical: 12,
                        borderBottomWidth: 1,
                        borderBottomColor: "#E5E5E5",
                    }}
                >
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: 16 }}
                    >
                        {categoryFilters.map((item) => (
                            <TouchableOpacity
                                key={item.key}
                                style={[
                                    styles.filterButton,
                                    {
                                        marginRight: 12,
                                        paddingHorizontal: 16,
                                        paddingVertical: 8,
                                        borderRadius: 14,
                                    },
                                    selectedFilter === item.key &&
                                    styles.filterButtonActive,
                                ]}
                                onPress={() => setSelectedFilter(item.key)}
                            >
                                <Text
                                    style={[
                                        styles.filterText,
                                        selectedFilter === item.key &&
                                        styles.filterTextActive,
                                    ]}
                                >
                                    {item.label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* 내 글 */}
                <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
                    <FlatList
                        key={"two-columns"}
                        data={filteredPosts}
                        numColumns={2}
                        columnWrapperStyle={{ justifyContent: "space-between" }}
                        contentContainerStyle={{
                            paddingBottom: 120,
                            paddingHorizontal: 10,
                            marginTop: 10,
                        }}
                        keyExtractor={(item) => item.postId.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() =>
                                    navigation.push("ReviewDetail", {
                                        review: {
                                            postId: item.postId,
                                            title: item.title,
                                            rating: item.rating,
                                            content: item.content,
                                            imageUrl: item.imageUrl,
                                            category: item.category,
                                            detail: item.detail,
                                            createdAt: item.createdAt,

                                            // ⭐ 작성자 정보는 user 객체 형태로 묶기
                                            user: {
                                                id: item.userId,
                                                nickname: item.userNickname,
                                                profileImage: item.userProfileImage,
                                            },

                                            // ⭐ 로그인한 내 userId
                                            myId: user.id,
                                        },
                                    })
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

                    {/* 플로팅 버튼 */}
                    <TouchableOpacity
                        style={[styles.fab, { zIndex: 1 }]}
                        onPress={() => navigation.navigate("ReviewWrite")}
                    >
                        <Text style={styles.fabText}>＋</Text>
                    </TouchableOpacity>
                </View>

                {/* 소개글 수정 모달 */}
                <Modal visible={editModalVisible} transparent>
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: "rgba(0,0,0,0.5)",
                            justifyContent: "center",
                            padding: 25,
                        }}
                    >
                        <View
                            style={{
                                backgroundColor: "white",
                                padding: 20,
                                borderRadius: 10,
                            }}
                        >
                            <Text style={{ fontSize: 18, marginBottom: 10 }}>
                                소개글 수정
                            </Text>

                            <TextInput
                                value={introduceText}
                                onChangeText={setIntroduceText}
                                multiline
                                placeholder="소개글을 입력하세요"
                                style={{
                                    height: 120,
                                    borderWidth: 1,
                                    borderColor: "#DDD",
                                    borderRadius: 8,
                                    padding: 10,
                                    marginBottom: 20,
                                }}
                            />

                            <Button title="저장" onPress={saveIntroduce} />
                            <View style={{ height: 10 }} />
                            <Button
                                title="취소"
                                color="gray"
                                onPress={() => setEditModalVisible(false)}
                            />
                        </View>
                    </View>
                </Modal>
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;
