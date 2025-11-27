import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { decode as base64_decode } from "base-64";
import React, { useState } from "react";
import {
    Alert,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { createReview } from "../api/groupFeedApi";
import { GroupReviewCreateStyles as styles } from "../styles/GroupReviewCreateStyles";

export default function GroupReviewCreateScreen({ route, navigation }: any) {
    const { feedId } = route.params;

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    /** ⭐ 반별(0.5 단위) 처리 */
    const handleStarPress = (index: number) => {
        let newValue = index + 1;

        if (newValue === rating) {
            setRating(rating - 0.5);
        } else {
            setRating(newValue);
        }
    };

    /** ⭐ 별 렌더링 */
    const renderStars = () => {
        const stars = [];

        for (let i = 0; i < 5; i++) {
            let iconName = "star-outline";
            let iconColor = "#FFD700";

            if (rating >= i + 1) {
                iconName = "star";
            } else if (rating >= i + 0.5) {
                iconName = "star-half";
            }

            stars.push(
                <TouchableOpacity key={i} onPress={() => handleStarPress(i)}>
                    <Ionicons name={iconName as any} size={40} color={iconColor} />
                </TouchableOpacity>
            );
        }

        return <View style={styles.starContainer}>{stars}</View>;
    };

    /** ⭐ 리뷰 제출 */
    const submit = async () => {
        const token = await AsyncStorage.getItem("accessToken");
        if (!token) return;

        // 🟧 JWT에서 userId 추출
        const payload = JSON.parse(
            base64_decode(token.split(".")[1].padEnd(4, "="))
        );
        const userId = payload.userId;

        if (!rating) {
            Alert.alert("알림", "별점을 입력해주세요.");
            return;
        }

        try {
            await createReview({
                feedId,
                userId,  // ⭐ 필수 값
                rating,
                comment,
            });

            Alert.alert("완료", "리뷰가 등록되었습니다.");
            navigation.goBack();
        } catch (e) {
            console.log("리뷰 생성 실패:", e);
            Alert.alert("오류", "리뷰 등록에 실패했습니다.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>리뷰 작성</Text>

            <Text style={styles.label}>별점</Text>
            {renderStars()}

            <Text style={styles.label}>한줄평</Text>
            <TextInput
                style={styles.input}
                placeholder="한줄평을 입력해주세요"
                placeholderTextColor="#999"
                value={comment}
                onChangeText={setComment}
                multiline
            />

            <TouchableOpacity
                style={styles.button}
                onPress={submit}
            >
                <Text style={styles.buttonText}>작성하기</Text>
            </TouchableOpacity>
        </View>
    );
}
