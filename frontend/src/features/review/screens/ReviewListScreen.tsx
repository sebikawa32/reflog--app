import React from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../../App'; // ✅ App.tsx 타입 가져오기

// 타입 정의
type ReviewListScreenRouteProp = RouteProp<RootStackParamList, 'ReviewList'>;
type ReviewListScreenNavProp = NativeStackNavigationProp<
    RootStackParamList,
    'ReviewList'
>;

// 더미 데이터
const dummyReviews = [
    {
        id: '1',
        title: '노르웨이의 숲',
        content: '청춘의 외로움과 상실을 그린 이야기.',
        image: 'https://upload.wikimedia.org/wikipedia/ko/0/0d/NorwegianWood.jpg',
        rating: 4.5,
    },
    {
        id: '2',
        title: '해리포터',
        content: '우정과 용기의 성장 스토리 ⚡️',
        image:
            "https://upload.wikimedia.org/wikipedia/en/a/a9/Harry_Potter_and_the_Philosopher%27s_Stone_Book_Cover.jpg",
        rating: 5,
    },
    {
        id: '3',
        title: '쇼생크 탈출',
        content: '희망은 인간의 가장 위대한 힘.',
        image:
            'https://upload.wikimedia.org/wikipedia/en/8/81/ShawshankRedemptionMoviePoster.jpg',
        rating: 4.8,
    },
    {
        id: '4',
        title: '데미안',
        content: '자기 자신을 찾는 성장의 여정.',
        image:
            'https://upload.wikimedia.org/wikipedia/commons/5/55/Demian_first_edition_cover.jpg',
        rating: 4.3,
    },
    {
        id: '5',
        title: '1984',
        content: '감시와 통제의 디스토피아 사회.',
        image: 'https://upload.wikimedia.org/wikipedia/en/c/c3/1984first.jpg',
        rating: 4.7,
    },
    {
        id: '6',
        title: '어린 왕자',
        content: '순수함 속의 철학 💫',
        image: 'https://upload.wikimedia.org/wikipedia/en/0/05/Littleprince.JPG',
        rating: 4.9,
    },
];

const ReviewListScreen = ({ route }: { route: ReviewListScreenRouteProp }) => {
    const { category } = route.params;
    const navigation = useNavigation<ReviewListScreenNavProp>();
    const screenWidth = Dimensions.get('window').width;
    const cardWidth = (screenWidth - 60) / 3; // 한 줄 3개 카드

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>{category} 독후감 목록</Text>

            <FlatList
                data={dummyReviews}
                numColumns={3}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[styles.card, { width: cardWidth }]}
                        activeOpacity={0.85}
                        onPress={() => navigation.navigate('ReviewDetail', { review: item })}
                    >
                        <Image
                            source={{
                                uri:
                                    item.image ||
                                    'https://upload.wikimedia.org/wikipedia/commons/b/b9/No_Cover.jpg',
                            }}
                            style={styles.image}
                        />
                        <Text style={styles.title} numberOfLines={1}>
                            {item.title}
                        </Text>

                        {/* ⭐️ 별점 영역 */}
                        <View style={styles.ratingContainer}>
                            {Array.from({ length: 5 }).map((_, index) => (
                                <Ionicons
                                    key={index}
                                    name={
                                        index < Math.round(item.rating)
                                            ? 'star'
                                            : 'star-outline'
                                    }
                                    size={14}
                                    color="#F2C94C"
                                    style={{ marginHorizontal: 1 }}
                                />
                            ))}
                            <Text style={styles.ratingText}>
                                {item.rating.toFixed(1)}
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </SafeAreaView>
    );
};

// 스타일
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: 15,
    },
    header: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 15,
        color: '#2F2B28',
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 14,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 3,
        alignItems: 'center',
        overflow: 'hidden',
        paddingBottom: 10,
    },
    image: {
        width: '100%',
        height: 110,
        resizeMode: 'cover',
    },
    title: {
        fontSize: 13,
        fontWeight: '600',
        color: '#3B3025',
        textAlign: 'center',
        marginTop: 6,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 3,
    },
    ratingText: {
        fontSize: 12,
        color: '#8C8277',
        marginLeft: 3,
    },
});

export default ReviewListScreen;
