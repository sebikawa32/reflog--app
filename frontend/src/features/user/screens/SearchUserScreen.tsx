import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    Image,
    ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { userApi } from "../../../api/userApi";

const DEFAULT_PROFILE_IMG =
    "https://cdn-icons-png.flaticon.com/512/847/847969.png";

export default function SearchUserScreen() {
    const navigation = useNavigation<any>();

    const [keyword, setKeyword] = useState("");
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);

    const search = async () => {
        if (!keyword.trim()) return;

        setLoading(true);
        setSearched(true);

        try {
            const res = await userApi.search(keyword);
            setResults(res);
        } catch (e) {
            console.log("검색 오류:", e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
            {/* 🔥 커스텀 상단 헤더 제거된 상태 */}

            {/* 검색 입력창 */}
            <View
                style={{
                    backgroundColor: "white",
                    marginHorizontal: 22,
                    marginTop: 22,
                    borderRadius: 14,
                    flexDirection: "row",
                    alignItems: "center",
                    paddingHorizontal: 16,
                    paddingVertical: 14,
                    shadowColor: "#000",
                    shadowOpacity: 0.08,
                    shadowRadius: 6,
                    elevation: 2,
                }}
            >
                <TextInput
                    placeholder="닉네임을 입력하세요"
                    value={keyword}
                    onChangeText={setKeyword}
                    style={{
                        flex: 1,
                        fontSize: 15,
                        color: "#222",
                    }}
                    returnKeyType="search"
                    onSubmitEditing={search}
                />

                <TouchableOpacity onPress={search}>
                    <Text style={{ color: "#FF8F1F", fontSize: 15 }}>검색</Text>
                </TouchableOpacity>
            </View>

            {/* 로딩 */}
            {loading && (
                <View style={{ marginTop: 30 }}>
                    <ActivityIndicator size="large" color="#FF7A00" />
                </View>
            )}

            {/* 결과 없음 */}
            {searched && !loading && results.length === 0 && (
                <Text
                    style={{
                        textAlign: "center",
                        marginTop: 50,
                        fontSize: 15,
                        color: "#777",
                    }}
                >
                    검색 결과가 없어요.
                </Text>
            )}

            {/* 리스트 */}
            <FlatList
                data={results}
                keyExtractor={(item) => item.userId.toString()}
                contentContainerStyle={{ padding: 20 }}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate("UserProfile", {
                                userId: item.userId,
                            })
                        }
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            backgroundColor: "white",
                            padding: 14,
                            marginBottom: 14,
                            borderRadius: 14,
                            shadowColor: "#000",
                            shadowOpacity: 0.06,
                            shadowRadius: 4,
                            elevation: 2,
                        }}
                    >
                        <Image
                            source={{ uri: item.avatarUrl || DEFAULT_PROFILE_IMG }}
                            style={{
                                width: 52,
                                height: 52,
                                borderRadius: 26,
                                marginRight: 14,
                            }}
                        />

                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 16, fontWeight: "600" }}>
                                {item.nickname}
                            </Text>
                            <Text
                                style={{
                                    fontSize: 13,
                                    color: "#888",
                                    marginTop: 2,
                                }}
                            >
                                {item.isFollowing ? "팔로잉 중" : "팔로우하기 가능"}
                            </Text>
                        </View>

                        <Text style={{ color: "#FF7A00", fontWeight: "600" }}>
                            보기
                        </Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}
