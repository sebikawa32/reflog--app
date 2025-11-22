import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
    FlatList,
    Image,
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { HomeStyles as styles } from "../styles/HomeStyles";

const categoryFilters = [
    { key: "all", label: "전체" },
    { key: "book", label: "책" },
    { key: "movie", label: "영화" },
    { key: "drama", label: "드라마" },
    { key: "animation", label: "애니" },
];

const dummyFeed = [
    {
        id: "해리포터와 마법사의 돌",
        category: "book",
        content: "오늘 읽은 책은 참 따뜻했어요 ☕📘",
        image: "https://cdn-icons-png.flaticon.com/512/847/847969.png",
    },
    {
        id: "인셉션",
        category: "movie",
        content: "이번 영화 정말 재밌었어요 🎬🔥",
        image: "https://cdn-icons-png.flaticon.com/512/847/847969.png",
    },
];

const HomeScreen = () => {
    const navigation = useNavigation<any>();
    const [selectedFilter, setSelectedFilter] = useState("all");

    const filteredFeed =
        selectedFilter === "all"
            ? dummyFeed
            : dummyFeed.filter((item) => item.category === selectedFilter);

    return (
        <SafeAreaView style={styles.container}>

            {/* 🔹 프로필 영역 */}
            <View style={styles.profileContainer}>
                <Image
                    source={{
                        uri: "https://cdn-icons-png.flaticon.com/512/847/847969.png",
                    }}
                    style={styles.profileImage}
                />

                <Text style={styles.profileName}>세빈</Text>

                <View style={styles.statsContainer}>
                    <Text style={styles.statsText}>감상기록 12</Text>
                    <Text style={styles.dot}>·</Text>
                    <Text style={styles.statsText}>팔로워 120</Text>
                    <Text style={styles.dot}>·</Text>
                    <Text style={styles.statsText}>팔로잉 89</Text>
                </View>

                <Text style={styles.profileBio}>오늘도 감상 중 ✍️</Text>
            </View>

            {/* 🔹 필터 바 */}
            <View style={styles.filterBar}>
                {categoryFilters.map((item) => (
                    <TouchableOpacity
                        key={item.key}
                        style={[
                            styles.filterButton,
                            selectedFilter === item.key && styles.filterButtonActive,
                        ]}
                        onPress={() => setSelectedFilter(item.key)}
                    >
                        <Text
                            style={[
                                styles.filterText,
                                selectedFilter === item.key && styles.filterTextActive,
                            ]}
                        >
                            {item.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* 🔹 최신 피드 리스트 */}
            <FlatList
                data={filteredFeed}
                keyExtractor={(item) => item.id}
                style={{ marginTop: 10 }}
                renderItem={({ item }) => (
                    <View style={styles.feedCard}>
                        {/* 책/영화 제목 */}
                        <Text style={styles.feedTitle}>{item.id}</Text>

                        {/* 내용 */}
                        <Text style={styles.feedContent}>{item.content}</Text>

                        {/* 카테고리 태그 */}
                        <View style={styles.categoryTag}>
                            <Text style={styles.categoryTagText}>{item.category}</Text>
                        </View>
                    </View>
                )}
            />

        </SafeAreaView>
    );
};

export default HomeScreen;
