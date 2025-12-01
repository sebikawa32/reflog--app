import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const DEFAULT_PROFILE_IMG =
    "https://cdn-icons-png.flaticon.com/512/847/847969.png";

export default function FeedCard({ item }: { item: any }) {
    const nav = useNavigation<any>();

    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={() =>
                nav.navigate("ReviewDetail", {
                    review: {
                        postId: item.postId,
                        title: item.title,
                        rating: item.rating,
                        content: item.content,
                        imageUrl: item.imageUrl,

                        // ⭐ 추가해야 ReviewDetail에서 정상 표시됨
                        userId: item.userId,
                        userNickname: item.userNickname,
                        userProfileImage: item.userProfileImage,
                        createdAt: item.createdAt,
                    },
                })
            }

            style={{
                backgroundColor: "#FFF",
                marginHorizontal: 16,
                marginBottom: 20,
                borderRadius: 16,
                padding: 16,
                shadowColor: "#000",
                shadowOpacity: 0.05,
                shadowRadius: 5,
                elevation: 2,
            }}
        >
            {/* 🔶 작성자 */}
            <TouchableOpacity
                style={{ flexDirection: "row", alignItems: "center", marginBottom: 14 }}
                onPress={() => nav.navigate("UserProfile", { userId: item.userId })}
            >
                <Image
                    source={{ uri: item.userProfileImage || DEFAULT_PROFILE_IMG }}
                    style={{
                        width: 38,
                        height: 38,
                        borderRadius: 19,
                        marginRight: 10,
                    }}
                />
                <View>
                    <Text style={{ fontSize: 15, fontWeight: "600", color: "#333" }}>
                        {item.userNickname}
                    </Text>
                    <Text style={{ fontSize: 12, color: "#999", marginTop: 2 }}>
                        {item.createdAt.slice(0, 16)}
                    </Text>
                </View>
            </TouchableOpacity>

            {/* 🔥 본문 가로 배치 */}
            <View style={{ flexDirection: "row" }}>
                {/* 왼쪽 이미지 */}
                {item.imageUrl && (
                    <Image
                        source={{ uri: item.imageUrl }}
                        style={{
                            width: 100,
                            height: 140,
                            borderRadius: 12,
                            marginRight: 14,
                        }}
                    />
                )}

                {/* 오른쪽 텍스트 */}
                <View style={{ flex: 1 }}>
                    {/* 제목 */}
                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight: "700",
                            color: "#333",
                        }}
                        numberOfLines={2}
                    >
                        {item.title}
                    </Text>

                    {/* 내용 일부 */}
                    <Text
                        style={{
                            fontSize: 13,
                            color: "#666",
                            marginTop: 6,
                            marginBottom: 10,
                            lineHeight: 18,
                        }}
                        numberOfLines={2}
                    >
                        {item.content}
                    </Text>

                    {/* 별점 */}
                    <View style={{ flexDirection: "row" }}>
                        {[1, 2, 3, 4, 5].map((n) => (
                            <Text
                                key={n}
                                style={{
                                    fontSize: 18,
                                    marginRight: 2,
                                    color: item.rating >= n ? "#FFC107" : "#E0E0E0",
                                }}
                            >
                                ★
                            </Text>
                        ))}
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}
