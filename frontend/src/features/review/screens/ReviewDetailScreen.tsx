import { StatusBar } from "expo-status-bar";
import React, { useState, useCallback, useLayoutEffect, useEffect } from "react";
import {
    Alert,
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    ActionSheetIOS,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ReviewDetailStyles as styles } from "../styles/ReviewDetailStyles";
import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native";
import axios from "axios";

const DEFAULT_IMG = "https://cdn-icons-png.flaticon.com/512/4221/4221419.png";
const DEFAULT_PROFILE =
    "https://cdn-icons-png.flaticon.com/512/847/847969.png";

const ReviewDetailScreen = () => {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();

    /** HomeScreen → 전달된 원본 데이터 */
    const originalReview = route.params.review;

    /** review.user = {id, nickname, profileImage} */
    /** review.myId = 로그인한 유저 id */
    const [review, setReview] = useState(originalReview);
    const [rating, setRating] = useState(originalReview.rating || 0);

    /** 🔵 디버그 */
    useEffect(() => {
        console.log("🟦 전체 review:", review);
        console.log("🟩 review.user:", review.user);
        console.log("🟥 review.myId:", review.myId);
    }, [review]);

    /** 🔶 상세 조회 API 호출 → 최신 데이터로 갱신 */
    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const res = await axios.get(
                    `${process.env.EXPO_PUBLIC_API_URL}/api/posts/${originalReview.postId}`
                );

                // res.data 구조:
                // {
                //   postId, title, content, imageUrl, category,
                //   rating, createdAt, detail,
                //   userId, userNickname, userProfileImage
                // }

                const api = res.data;

                setReview((prev: any) => ({
                    ...prev,

                    // 🔥 백엔드 최신 내용 덮어씀
                    postId: api.postId,
                    title: api.title,
                    content: api.content,
                    imageUrl: api.imageUrl,
                    category: api.category,
                    rating: api.rating,
                    createdAt: api.createdAt,
                    detail: api.detail,

                    /** 🔥 백엔드에서 오는 값을 user 객체로 재구성 */
                    user: {
                        id: api.userId,
                        nickname: api.userNickname,
                        profileImage: api.userProfileImage,
                    },
                }));

                setRating(api.rating);
            } catch (err) {
                console.log("❌ 상세 조회 실패:", err);
            }
        };

        fetchDetail();
    }, []);

    /** 수정 후 자동 반영 */
    useFocusEffect(
        useCallback(() => {
            if (route.params?.updatedReview) {
                setReview(route.params.updatedReview);
                setRating(route.params.updatedReview.rating);
            }
        }, [route.params])
    );

    /** 🔶 상단 ... 버튼 */
    useLayoutEffect(() => {
        if (review.myId === review.user?.id) {
            navigation.setOptions({
                headerRight: () => (
                    <TouchableOpacity onPress={openMenu}>
                        <Text style={{ fontSize: 26, marginRight: 15, color: "white" }}>
                            ⋯
                        </Text>
                    </TouchableOpacity>
                ),
            });
        } else {
            navigation.setOptions({ headerRight: () => null });
        }
    }, [review, navigation]);

    /** 메뉴 */
    const openMenu = () => {
        ActionSheetIOS.showActionSheetWithOptions(
            {
                options: ["취소", "수정", "삭제"],
                destructiveButtonIndex: 2,
                cancelButtonIndex: 0,
            },
            (index) => {
                if (index === 1) handleEdit();
                if (index === 2) handleDelete();
            }
        );
    };

    const handleEdit = () => {
        navigation.navigate("ReviewEdit", {
            review,
            onReturn: (updated: any) => {
                setReview(updated);
                setRating(updated.rating);
            },
        });
    };

    const handleDelete = () => {
        Alert.alert("삭제", "정말 삭제하시겠습니까?", [
            { text: "취소", style: "cancel" },
            {
                text: "삭제",
                style: "destructive",
                onPress: async () => {
                    try {
                        await axios.delete(
                            `${process.env.EXPO_PUBLIC_API_URL}/api/posts/${review.postId}`
                        );
                        Alert.alert("완료", "삭제되었습니다.");
                        navigation.goBack();
                    } catch (err) {
                        console.log("🔥 DELETE ERROR:", err);
                    }
                },
            },
        ]);
    };

    const d = review.detail;

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar style="light" />

            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                {/* 🔶 작성자 */}
                <TouchableOpacity
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginHorizontal: 16,
                        marginTop: 20,
                        marginBottom: 14,
                    }}
                    onPress={() =>
                        navigation.navigate("UserProfile", { userId: review.user?.id })
                    }
                >
                    <Image
                        source={{
                            uri: review.user?.profileImage || DEFAULT_PROFILE,
                        }}
                        style={{
                            width: 42,
                            height: 42,
                            borderRadius: 21,
                            marginRight: 12,
                        }}
                    />

                    <View>
                        <Text style={{ fontSize: 16, fontWeight: "600", color: "#333" }}>
                            {review.user?.nickname}
                        </Text>
                        <Text style={{ fontSize: 12, color: "#888", marginTop: 2 }}>
                            {review.createdAt?.slice(0, 16)}
                        </Text>
                    </View>
                </TouchableOpacity>

                {/* 이미지 */}
                <View style={styles.coverWrapper}>
                    <Image
                        source={{ uri: review.imageUrl || DEFAULT_IMG }}
                        style={styles.coverImage}
                    />
                </View>

                {/* 제목 */}
                <Text style={styles.title}>{review.title}</Text>

                {/* 별점 */}
                <View style={styles.ratingContainer}>
                    <View style={styles.stars}>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Text
                                key={star}
                                style={[
                                    styles.star,
                                    rating >= star && styles.activeStar,
                                ]}
                            >
                                ★
                            </Text>
                        ))}
                    </View>
                    <Text style={styles.ratingLabel}>{rating} / 5</Text>
                </View>

                <View style={styles.titleDivider} />

                {/* 상세정보 */}
                <View style={{ marginHorizontal: 16 }}>
                    <Text style={styles.meta}>카테고리: {review.category}</Text>

                    {review.category === "book" && (
                        <>
                            {d?.author && <Text style={styles.meta}>저자: {d.author}</Text>}
                            {d?.publisher && (
                                <Text style={styles.meta}>출판사: {d.publisher}</Text>
                            )}
                        </>
                    )}

                    {review.category === "movie" && (
                        <>
                            {d?.director && (
                                <Text style={styles.meta}>감독: {d.director}</Text>
                            )}
                            {d?.actors && (
                                <Text style={styles.meta}>출연: {d.actors}</Text>
                            )}
                        </>
                    )}
                </View>

                {/* 본문 */}
                <Text
                    style={{
                        marginHorizontal: 16,
                        marginTop: 10,
                        fontSize: 15,
                        lineHeight: 22,
                        color: "#333",
                    }}
                >
                    {review.content}
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ReviewDetailScreen;
