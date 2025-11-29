import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { followApi } from "../../../api/followApi";

const DEFAULT_IMG = "https://cdn-icons-png.flaticon.com/512/847/847969.png";

export default function FollowListScreen({ route, navigation }: any) {
    const { userId, type } = route.params;
    const [list, setList] = useState<any[]>([]);

    const title = type === "followers" ? "팔로워" : "팔로잉";

    const loadList = async () => {
        try {
            const res =
                type === "followers"
                    ? await followApi.getFollowers(userId)
                    : await followApi.getFollowings(userId);

            setList(res);
        } catch (err) {
            console.log("FollowList 로딩 실패:", err);
        }
    };

    useEffect(() => {
        loadList();
    }, []);

    return (
        <View style={{ flex: 1, padding: 20, backgroundColor: "white" }}>
            <Text style={{ fontSize: 22, fontWeight: "600", marginBottom: 20 }}>
                {title}
            </Text>

            <FlatList
                data={list}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            paddingVertical: 12,
                        }}
                    >
                        <Image
                            source={{ uri: item.profileImg || DEFAULT_IMG }}
                            style={{
                                width: 48,
                                height: 48,
                                borderRadius: 24,
                                marginRight: 12,
                            }}
                        />
                        <Text style={{ fontSize: 16 }}>{item.nickname}</Text>
                    </TouchableOpacity>
                )}
                ListEmptyComponent={
                    <Text style={{ textAlign: "center", color: "#888", marginTop: 40 }}>
                        아직 없습니다
                    </Text>
                }
            />
        </View>
    );
}
