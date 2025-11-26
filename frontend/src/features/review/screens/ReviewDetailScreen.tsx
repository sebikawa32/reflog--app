import { StatusBar } from 'expo-status-bar';
import React, { useState, useCallback, useLayoutEffect, useEffect } from 'react';
import {
    Alert,
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    ActionSheetIOS,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ReviewDetailStyles as styles } from '../styles/ReviewDetailStyles';
import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native";
import axios from "axios";

const DEFAULT_IMG = 'https://cdn-icons-png.flaticon.com/512/4221/4221419.png';

const ReviewDetailScreen = () => {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();

    const originalReview = route.params.review;
    const [review, setReview] = useState(originalReview);
    const [rating, setRating] = useState(originalReview.rating || 0);

    /** ⭐ 상세정보 포함된 최신 데이터 다시 불러오기 */
    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const res = await axios.get(
                    `${process.env.EXPO_PUBLIC_API_URL}/api/posts/${originalReview.postId}`
                );
                setReview(res.data);
                setRating(res.data.rating);
            } catch (e) {
                console.log("❌ 상세 조회 실패:", e);
            }
        };

        fetchDetail();
    }, []);

    /** ⭐ 수정 후 자동 반영 */
    useFocusEffect(
        useCallback(() => {
            if (route.params?.updatedReview) {
                setReview(route.params.updatedReview);
                setRating(route.params.updatedReview.rating);
            }
        }, [route.params])
    );

    /** ⭐ 상단 ... 버튼 */
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={openMenu}>
                    <Text style={{ fontSize: 26, marginRight: 15 }}>⋯</Text>
                </TouchableOpacity>
            ),
        });
    }, [navigation, review]);

    /** ⭐ 옵션 메뉴 */
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

    /** ⭐ 수정 */
    const handleEdit = () => {
        navigation.navigate("ReviewEdit", {
            review,
            onReturn: (updated: any) => {
                setReview(updated);
                setRating(updated.rating);
            },
        });
    };

    /** ⭐ 삭제 */
    const handleDelete = () => {
        Alert.alert(
            "삭제",
            "정말 삭제하시겠습니까?",
            [
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
            ]
        );
    };

    const handleShare = () => {
        Alert.alert("공유", "공유 기능은 곧 연결됩니다");
    };

    /** ⭐ 카테고리 + 상세 정보 */
    const renderDetailInfo = () => {
        const d = review.detail;

        return (
            <>
                <Text style={styles.meta}>카테고리: {review.category}</Text>

                {/* 📌 book */}
                {review.category === "book" && (
                    <>
                        {d?.author && <Text style={styles.meta}>저자: {d.author}</Text>}
                        {d?.publisher && <Text style={styles.meta}>출판사: {d.publisher}</Text>}
                        {d?.readStartDate && <Text style={styles.meta}>시작일: {d.readStartDate}</Text>}
                        {d?.readEndDate && <Text style={styles.meta}>종료일: {d.readEndDate}</Text>}
                    </>
                )}

                {/* 📌 movie */}
                {review.category === "movie" && (
                    <>
                        {d?.director && <Text style={styles.meta}>감독: {d.director}</Text>}
                        {d?.actors && <Text style={styles.meta}>출연: {d.actors}</Text>}
                        {d?.releaseDate && <Text style={styles.meta}>개봉일: {d.releaseDate}</Text>}
                        {d?.runningTime && <Text style={styles.meta}>러닝타임: {d.runningTime}</Text>}
                    </>
                )}

                {/* 📌 drama */}
                {review.category === "drama" && (
                    <>
                        {d?.broadcastNetwork && (
                            <Text style={styles.meta}>방송사: {d.broadcastNetwork}</Text>
                        )}
                        {d?.startDate && (
                            <Text style={styles.meta}>시작일: {d.startDate}</Text>
                        )}
                        {d?.endDate && (
                            <Text style={styles.meta}>종료일: {d.endDate}</Text>
                        )}
                    </>
                )}

                {/* 📌 animation */}
                {review.category === "animation" && (
                    <>
                        {d?.studio && <Text style={styles.meta}>제작사: {d.studio}</Text>}
                        {d?.episodes != null && (
                            <Text style={styles.meta}>에피소드: {d.episodes}</Text>
                        )}
                        {d?.releaseDate && (
                            <Text style={styles.meta}>방영일: {d.releaseDate}</Text>
                        )}
                    </>
                )}
            </>
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar style="dark" />

            <ScrollView
                style={styles.container}
                contentContainerStyle={{ paddingBottom: 40 }}
                showsVerticalScrollIndicator={false}
            >
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

                {/* 상세 정보 */}
                <View style={{ marginHorizontal: 16, marginBottom: 10 }}>
                    {renderDetailInfo()}
                </View>

                {/* 설명 */}
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
