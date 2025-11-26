import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ReviewWriteStyles as styles } from "../styles/ReviewWriteStyles";
import { postApi } from "../../../api/postApi";
import { useNavigation } from "@react-navigation/native";

const ReviewEditScreen = ({ route }: any) => {
    const { review, onReturn } = route.params; // 수정할 기존 리뷰 + callback
    const navigation = useNavigation<any>();

    const [title, setTitle] = useState(review.title);
    const [content, setContent] = useState(review.content);
    const [category, setCategory] = useState(review.category);
    const [rating, setRating] = useState(review.rating);

    const handleUpdate = async () => {
        try {
            // ⭐ 서버에 수정 요청
            const updated = await postApi.update(review.postId, {
                title,
                content,
                category,
                rating,
            });

            // ⭐ 수정된 듯한 전체 객체 생성 (id(postId) 유지!!)
            const updatedReview = {
                ...review,        // 기존 데이터 유지 → postId 포함됨
                title,
                content,
                category,
                rating,
            };

            Alert.alert("수정 완료", "리뷰가 수정되었습니다.", [
                {
                    text: "확인",
                    onPress: () => {
                        // ⭐ ReviewDetail로 최신 리뷰 전달
                        if (onReturn) {
                            onReturn(updatedReview);
                        }
                        navigation.goBack();
                    },
                },
            ]);
        } catch (e) {
            console.log("❌ 리뷰 수정 실패:", e);
            Alert.alert("오류", "리뷰 수정 중 문제가 발생했습니다.");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.header}>리뷰 수정</Text>

                {/* 제목 */}
                <Text style={styles.label}>제목</Text>
                <TextInput
                    value={title}
                    onChangeText={setTitle}
                    style={styles.input}
                />

                {/* 내용 */}
                <Text style={styles.label}>내용</Text>
                <TextInput
                    value={content}
                    multiline
                    onChangeText={setContent}
                    style={[styles.input, { height: 150 }]}
                />

                {/* 카테고리 선택 */}
                <Text style={styles.label}>카테고리</Text>
                <View style={styles.categoryGroup}>
                    {["book", "movie", "drama", "animation"].map((c) => (
                        <TouchableOpacity
                            key={c}
                            style={[
                                styles.categoryButton,
                                category === c && styles.categorySelected,
                            ]}
                            onPress={() => setCategory(c)}
                        >
                            <Text
                                style={[
                                    styles.categoryText,
                                    category === c && styles.categoryTextSelected,
                                ]}
                            >
                                {c}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* 별점 */}
                <View style={styles.starContainer}>
                    {[1, 2, 3, 4, 5].map((i) => (
                        <TouchableOpacity key={i} onPress={() => setRating(i)}>
                            <Text style={{ fontSize: 28, color: rating >= i ? "#FF7A00" : "#ccc" }}>
                                ★
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* 저장 버튼 */}
                <TouchableOpacity
                    style={[
                        styles.categoryButton,
                        { backgroundColor: "#FF7A00", marginTop: 25 },
                    ]}
                    onPress={handleUpdate}
                >
                    <Text
                        style={{
                            color: "white",
                            fontSize: 16,
                            fontWeight: "700",
                            textAlign: "center",
                        }}
                    >
                        수정 완료
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ReviewEditScreen;
