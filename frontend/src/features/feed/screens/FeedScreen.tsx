import React, { useEffect, useState } from "react";
import { View, FlatList, ActivityIndicator, Text } from "react-native";
import { fetchFollowingFeed } from "../api/feedApi";
import FeedCard from "../components/FeedCard";

export default function FeedScreen() {
  const [feed, setFeed] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadFeed = async () => {
    try {
      const data = await fetchFollowingFeed();
      setFeed(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFeed();
  }, []);

  if (loading) {
    return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size="large" />
        </View>
    );
  }

  /** ⭐ 팔로우 0명 → 피드 없음 안내 */
  if (feed.length === 0) {
    return (
        <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: 20,
            }}
        >
          <Text
              style={{
                fontSize: 16,
                color: "#777",
                textAlign: "center",
                lineHeight: 22,
              }}
          >
            아직 팔로우한 사용자가 없어요!{"\n"}
            팔로우하면 새로운 피드가 여기에 표시됩니다.
          </Text>
        </View>
    );
  }

  return (
      <FlatList
          data={feed}
          renderItem={({ item }) => <FeedCard item={item} />}
          keyExtractor={(item) => item.postId.toString()}
      />
  );
}
