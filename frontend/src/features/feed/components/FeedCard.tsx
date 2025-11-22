import React from "react";
import { View, Text, Image } from "react-native";

interface FeedItem {
    postId: number;
    nickname: string;
    profileImage?: string;
    content: string;
    imageUrl?: string;
    createdAt: string;
}

export default function FeedCard({ item }: { item: FeedItem }) {
    return (
        <View style={{ padding: 16, borderBottomWidth: 1, borderColor: "#eee" }}>
            {/* 프로필 */}
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
                <Image
                    source={{ uri: item.profileImage }}
                    style={{ width: 40, height: 40, borderRadius: 20 }}
                />
                <Text style={{ marginLeft: 10, fontSize: 16, fontWeight: "600" }}>
                    {item.nickname}
                </Text>
            </View>

            {/* 텍스트 */}
            <Text style={{ fontSize: 15, marginBottom: 10 }}>{item.content}</Text>

            {/* 이미지 */}
            {item.imageUrl && (
                <Image
                    source={{ uri: item.imageUrl }}
                    style={{
                        width: "100%",
                        height: 200,
                        borderRadius: 8,
                    }}
                    resizeMode="cover"
                />
            )}

            {/* 날짜 */}
            <Text style={{ marginTop: 8, color: "#999", fontSize: 12 }}>
                {item.createdAt.slice(0, 16)}
            </Text>
        </View>
    );
}
