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

    /** FeedCard → ReviewDetail 로 전달된 원본 데이터 */
    const originalReview = route.params.review;

    const [review, setReview] = useState(originalReview);
    const [rating, setRating] = useState(originalReview.rating || 0);
    const [myId, setMyId] = useState<number | null>(null); // 로그인한 유저 ID 저장

    /** 🔶 로그인 유저 아이디 가져오기 */
    useEffect(() => {
        const loadMyInfo = async () => {
            try {
                const res = await axios.get(
                    `${process.env.EXPO_PUBLIC_API_URL}/api/users/me`,
                    { withCredentials: true }
                );
                setMyId(res.data.id);
            } catch (e) {
                console.log("인증실패: 작성자 아님: 편집불가", e);
            }
        };

        loadMyInfo();
    }, []);

    /** 🔶 최신 상세 데이터 다시 불러오기 */
    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const res = await axios.get(
                    `${process.env.EXPO_PUBLIC_API_URL}/api/posts/${originalReview.postId}`
                );

                setReview((prev: any) => ({
                    ...prev,        // 기존 데이터 유지 (닉네임, 프로필 등)
                    ...res.data     // API에서 가져온 상세 정보만 덮어씀
                }));


                setRating(res.data.rating);
            } catch (e) {
                console.log("❌ 상세 조회 실패:", e);
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

    /** 🔶 상단 헤더의 ... 버튼 - 내 글일 때만 보여줌 */
    useLayoutEffect(() => {
        if (myId === review.userId) {
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
            navigation.setOptions({
                headerRight: () => null,
            });
        }
    }, [navigation, review, myId]);

    /** 메뉴 */
    const openMenu = () => {
        ActionSheetIOS.showActionSheetWithOptions(
            {
                options: ["취소", "수정", "삭제", "공유"],
                destructiveButtonIndex: 2,
                cancelButtonIndex: 0,
            },
            (buttonIndex) => {
                if (buttonIndex === 1) handleEdit();
                else if (buttonIndex === 2) handleDelete();
                else if (buttonIndex === 3) handleShare();
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

    const handleShare = () => {
        Alert.alert("공유", "공유 기능은 곧 연결됩니다");
    };

    /** 🔶 상세 정보 */
    const renderDetailInfo = () => {
        const d = review.detail;
        return (
            <>
                <Text style={styles.meta}>카테고리: {review.category}</Text>

                {review.category === "book" && (
                    <>
                        {d?.author && <Text style={styles.meta}>저자: {d.author}</Text>}
                        {d?.publisher && <Text style={styles.meta}>출판사: {d.publisher}</Text>}
                        {d?.readStartDate && <Text style={styles.meta}>시작일: {d.readStartDate}</Text>}
                        {d?.readEndDate && <Text style={styles.meta}>종료일: {d.readEndDate}</Text>}
                    </>
                )}

                {review.category === "movie" && (
                    <>
                        {d?.director && <Text style={styles.meta}>감독: {d.director}</Text>}
                        {d?.actors && <Text style={styles.meta}>출연: {d.actors}</Text>}
                        {d?.releaseDate && <Text style={styles.meta}>개봉일: {d.releaseDate}</Text>}
                        {d?.runningTime && <Text style={styles.meta}>러닝타임: {d.runningTime}</Text>}
                    </>
                )}

                {review.category === "drama" && (
                    <>
                        {d?.broadcastNetwork && (
                            <Text style={styles.meta}>방송사: {d.broadcastNetwork}</Text>
                        )}
                        {d?.startDate && <Text style={styles.meta}>시작일: {d.startDate}</Text>}
                        {d?.endDate && <Text style={styles.meta}>종료일: {d.endDate}</Text>}
                    </>
                )}

                {review.category === "animation" && (
                    <>
                        {d?.studio && <Text style={styles.meta}>제작사: {d.studio}</Text>}
                        {d?.episodes != null && (
                            <Text style={styles.meta}>에피소드: {d.episodes}</Text>
                        )}
                        {d?.releaseDate && <Text style={styles.meta}>방영일: {d.releaseDate}</Text>}
                    </>
                )}
            </>
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar style="light" />

            <ScrollView
                style={styles.container}
                contentContainerStyle={{ paddingBottom: 40 }}
                showsVerticalScrollIndicator={false}
            >
                {/* 🔶 작성자 정보 (프로필 + 이름 + 날짜) */}
                <TouchableOpacity
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginHorizontal: 16,
                        marginTop: 20,
                        marginBottom: 14,
                    }}
                    onPress={() => navigation.navigate("UserProfile", { userId: review.userId })}
                >
                    <Image
                        source={{ uri: review.userProfileImage || DEFAULT_PROFILE }}
                        style={{
                            width: 42,
                            height: 42,
                            borderRadius: 21,
                            marginRight: 12,
                        }}
                    />

                    <View>
                        <Text style={{ fontSize: 16, fontWeight: "600", color: "#333" }}>
                            {review.userNickname}
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
                    <View style={styles.overlay} />
                </View>

                {/* 제목 */}
                <Text style={styles.title}>{review.title}</Text>

                {/* 별점 */}
                <View style={styles.ratingContainer}>
                    <View style={styles.stars}>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <TouchableOpacity key={star} onPress={() => setRating(star)}>
                                <Text
                                    style={[
                                        styles.star,
                                        rating >= star && styles.activeStar,
                                        rating === star && styles.selectedStar,
                                    ]}
                                >
                                    ★
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <Text style={styles.ratingLabel}>{rating} / 5</Text>
                </View>

                <View style={styles.titleDivider} />

                {/* 상세정보 */}
                <View style={{ marginHorizontal: 16, marginBottom: 10 }}>
                    {renderDetailInfo()}
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
