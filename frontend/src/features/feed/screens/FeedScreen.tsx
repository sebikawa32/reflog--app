import React, { useEffect, useState } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
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

  return (
      <FlatList
          data={feed}
          renderItem={({ item }) => <FeedCard item={item} />}
          keyExtractor={(item) => item.postId.toString()}
      />
  );
}
