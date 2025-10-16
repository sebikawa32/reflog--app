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
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// 💡 네비게이션 타입 정의
type RootStackParamList = {
        Home: undefined;
ReviewList: { category: string };
ReviewDetail: { review: { id: string; title: string; content: string; image?: string; rating?: number } };
        };

type ReviewListScreenRouteProp = RouteProp<RootStackParamList, 'ReviewList'>;
type ReviewListScreenNavProp = StackNavigationProp<RootStackParamList, 'ReviewList'>;

// 📚 샘플 데이터
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
image: 'https://upload.wikimedia.org/wikipedia/en/a/a9/Harry_Potter_and_the_Philosopher%27s_Stone_Book_Cover.jpg',
rating: 5,
        },
        {
id: '3',
title: '쇼생크 탈출',
content: '희망은 인간의 가장 위대한 힘.',
image: 'https://upload.wikimedia.org/wikipedia/en/8/81/ShawshankRedemptionMoviePoster.jpg',
rating: 4.8,
        },
        {
id: '4',
title: '데미안',
content: '자기 자신을 찾는 성장의 여정.',
image: 'https://upload.wikimedia.org/wikipedia/commons/5/55/Demian_first_edition_cover.jpg',
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
  const cardWidth = (screenWidth - 60) / 3; // 3열 기준 카드 크기 계산

        return (
    <View style={styles.container}>
      <Text style={styles.header}>{category} 독후감 목록</Text>
      <FlatList
data={dummyReviews}
numColumns={3}
keyExtractor={(item) => item.id}
columnWrapperStyle={{ justifyContent: 'space-between' }}
renderItem={({ item }) => (
          <TouchableOpacity
style={[styles.card, { width: cardWidth }]}
onPress={() => navigation.navigate('ReviewDetail', { review: item })}
activeOpacity={0.8}
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
            <Text style={styles.rating}>
        {'★'.repeat(Math.round(item.rating || 4))}{' '}
              <Text style={styles.ratingText}>
        {item.rating?.toFixed(1) || '4.0'}
              </Text>
            </Text>
          </TouchableOpacity>
        )}
        />
    </View>
        );
        };

// 🎨 스타일
        const styles = StyleSheet.create({
    container: {
        flex: 1,
                backgroundColor: '#fdfbf7',
                padding: 15,
    },
    header: {
        fontSize: 20,
                fontWeight: '700',
                marginBottom: 15,
                color: '#3b3025',
    },
    card: {
        backgroundColor: '#fff',
                borderRadius: 12,
                marginBottom: 16,
                shadowColor: '#000',
                shadowOpacity: 0.08,
                shadowRadius: 5,
                elevation: 2,
                alignItems: 'center',
                overflow: 'hidden',
                paddingBottom: 8,
    },
    image: {
        width: '100%',
                height: 100,
                resizeMode: 'cover',
    },
    title: {
        fontSize: 13,
                fontWeight: '600',
                color: '#3b3025',
                textAlign: 'center',
                marginTop: 6,
    },
    rating: {
        fontSize: 13,
                color: '#f2c94c',
                textAlign: 'center',
                marginTop: 2,
    },
    ratingText: {
        color: '#999',
                fontSize: 12,
    },
});

export default ReviewListScreen;
