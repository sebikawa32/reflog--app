import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { getFeedDetail, getReviews } from "../api/groupFeedApi";
import { FeedDetailStyles as styles } from "../styles/FeedDetailStyles";

const FeedDetailScreen = ({ route }: any) => {
    const { feedId } = route.params;
    const navigation = useNavigation<any>();
    const isFocused = useIsFocused();

    const [feed, setFeed] = useState<any>(null);
    const [reviews, setReviews] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [myUserId, setMyUserId] = useState<number | null>(null);

    /** 🔥 JWT에서 userId 가져오기 */
    const loadUserId = async () => {
        const token = await AsyncStorage.getItem("accessToken");
        if (!token) return;

        const payload = JSON.parse(
            atob(token.split(".")[1])
        );

        setMyUserId(payload.userId);
    };

    /** 🔥 상세 + 리뷰 로딩 */
    const fetchData = async () => {
        try {
            setLoading(true);

            console.log("📌 [요청] getFeedDetail, feedId:", feedId);
            const response = await getFeedDetail(feedId);
            console.log("📌 [응답] FeedDetail:", response.data);

            setFeed(response.data);

            console.log("📌 [요청] getReviews, feedId:", feedId);
            const reviewRes = await getReviews(feedId);
            console.log("📌 [응답] Reviews:", reviewRes.data);

            setReviews(reviewRes.data || []);

        } catch (e) {
            console.log("❌ [오류] fetchData 실패:", e);
        } finally {
            setLoading(false);
        }
    };

    /** 화면 재진입 시 자동 새로고침 */
    useEffect(() => {
        loadUserId();
    }, []);

    useEffect(() => {
        if (isFocused) {
            fetchData();
        }
    }, [isFocused]);

    /** 리뷰 작성 페이지 이동 */
    const goToReviewCreate = () => {
        navigation.navigate("GroupReviewCreate", { feedId });
    };

    /** 리뷰 수정 페이지 이동 */
    const goToReviewEdit = (review: any) => {
        navigation.navigate("GroupReviewCreate", {
            feedId,
            mode: "edit",
            review,
        });
    };

    /** 로딩 화면 */
    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    /** feed가 없으면 안내 */
    if (!feed) {
        return (
            <View style={styles.loadingContainer}>
                <Text>피드 정보를 불러올 수 없습니다.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView>

                {/* 피드 기본정보 */}
                <View style={styles.feedBox}>
                    <Text style={styles.feedTitle}>{feed.title}</Text>

                    {feed.introText && (
                        <Text style={styles.feedDesc}>{feed.introText}</Text>
                    )}

                    <Text style={styles.feedInfo}>카테고리: {feed.category}</Text>
                    <Text style={styles.feedInfo}>마감일: {feed.endDate}</Text>
                    <Text style={styles.feedInfo}>등록일: {feed.createdAt}</Text>
                </View>

                {/* 리뷰 리스트 */}
                <View style={styles.reviewSection}>
                    <Text style={styles.sectionTitle}>멤버 리뷰</Text>

                    {reviews.length === 0 ? (
                        <Text style={styles.emptyText}>리뷰가 아직 없어요.</Text>
                    ) : (
                        reviews.map((r, i) => {

                            // ⭐ 별 아이콘 생성
                            const stars = [];
                            const fullStars = Math.floor(r.rating);
                            const halfStar = r.rating % 1 !== 0;
                            const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

                            for (let i = 0; i < fullStars; i++) {
                                stars.push(
                                    <Ionicons
                                        key={`full-${i}`}
                                        name="star"
                                        size={20}
                                        color="#FFD700"
                                    />
                                );
                            }
                            if (halfStar) {
                                stars.push(
                                    <Ionicons
                                        key="half"
                                        name="star-half"
                                        size={20}
                                        color="#FFD700"
                                    />
                                );
                            }
                            for (let i = 0; i < emptyStars; i++) {
                                stars.push(
                                    <Ionicons
                                        key={`empty-${i}`}
                                        name="star-outline"
                                        size={20}
                                        color="#FFD700"
                                    />
                                );
                            }

                            return (
                                <View key={i} style={styles.reviewCard}>

                                    {/* 닉네임 + 수정 아이콘 */}
                                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                        <Text style={styles.reviewUser}>
                                            {r.userName || "알 수 없음"}
                                        </Text>

                                        {/* 🔥 본인 리뷰에만 수정 버튼 표시 */}
                                        {r.userId === myUserId && (
                                            <TouchableOpacity onPress={() => goToReviewEdit(r)}>
                                                <Ionicons name="create-outline" size={22} color="#888" />
                                            </TouchableOpacity>
                                        )}
                                    </View>

                                    {/* ⭐ 별 표시 */}
                                    <View style={{ flexDirection: "row", marginVertical: 4 }}>
                                        {stars}
                                    </View>

                                    {/* "한줄평" 표시 */}
                                    <Text style={styles.reviewContent}>
                                        "{r.comment}"
                                    </Text>
                                </View>
                            );
                        })
                    )}
                </View>

            </ScrollView>

            {/* 🔥 이미 리뷰를 남겼다면 + 버튼 숨기기 */}
            {reviews.some(r => r.userId === myUserId) ? null : (
                <TouchableOpacity style={styles.floatingButton} onPress={goToReviewCreate}>
                    <Ionicons name="add" size={34} color="#fff" />
                </TouchableOpacity>
            )}
        </View>
    );
};

export default FeedDetailScreen;
