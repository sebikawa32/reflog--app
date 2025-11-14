import React from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ReviewListStyles as styles } from "../styles/ReviewListStyles";

// 네비게이션 param 타입
type RootStackParamList = {
  Home: undefined;
  ReviewList: { category: string };
  ReviewDetail: { review: any };
};

// props 타입 생성
type Props = NativeStackScreenProps<RootStackParamList, "ReviewList">;

const dummyReviews = [
  {
    id: "1",
    title: "노르웨이의 숲",
    content: "청춘의 외로움과 상실을 그린 이야기.",
    image: "https://upload.wikimedia.org/wikipedia/ko/0/0d/NorwegianWood.jpg",
    rating: 4.5,
  },
  {
    id: "2",
    title: "해리포터",
    content: "우정과 용기의 성장 스토리 ⚡️",
    image:
        "https://upload.wikimedia.org/wikipedia/en/a/a9/Harry_Potter_and_the_Philosopher%27s_Stone_Book_Cover.jpg",
    rating: 5,
  },
];

export default function ReviewListScreen({ route, navigation }: Props) {
  const { category } = route.params;

  const screenWidth = Dimensions.get("window").width;
  const cardWidth = (screenWidth - 60) / 3;

  return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>{category} 독후감 목록</Text>

        <FlatList
            data={dummyReviews}
            numColumns={3}
            keyExtractor={(item) => item.id}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            renderItem={({ item }) => (
                <TouchableOpacity
                    style={[styles.card, { width: cardWidth }]}
                    onPress={() =>
                        navigation.navigate("ReviewDetail", {
                          review: item,
                        })
                    }
                >
                  <Image source={{ uri: item.image }} style={styles.image} />

                  <Text style={styles.title} numberOfLines={1}>
                    {item.title}
                  </Text>

                  <View style={styles.ratingContainer}>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <Ionicons
                            key={index}
                            name={index < Math.round(item.rating) ? "star" : "star-outline"}
                            size={14}
                            color="#F2C94C"
                            style={{ marginHorizontal: 1 }}
                        />
                    ))}
                    <Text style={styles.ratingText}>{item.rating.toFixed(1)}</Text>
                  </View>
                </TouchableOpacity>
            )}
        />
      </SafeAreaView>
  );
}
