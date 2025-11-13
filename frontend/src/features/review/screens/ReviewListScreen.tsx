import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackParamList } from '../../../../App'; // ✅ App.tsx 타입 가져오기
import { ReviewListStyles as styles } from '../styles/ReviewListStyles'; // ✅ 스타일 분리

// 타입 정의
type ReviewListScreenRouteProp = RouteProp<RootStackParamList, 'ReviewList'>;
type ReviewListScreenNavProp = NativeStackNavigationProp<
  RootStackParamList,
  'ReviewList'
>;

// ✅ 더미 데이터 그대로 유지
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
            {/* 이미지 */}
            <Image
              source={{
                uri:
                  item.image ||
                  'https://upload.wikimedia.org/wikipedia/commons/b/b9/No_Cover.jpg',
              }}
              style={styles.image}
            />

            {/* 제목 */}
            <Text style={styles.title} numberOfLines={1}>
              {item.title}
            </Text>

            {/* ⭐️ 별점 */}
            <View style={styles.ratingContainer}>
              {Array.from({ length: 5 }).map((_, index) => (
                <Ionicons
                  key={index}
                  name={index < Math.round(item.rating) ? 'star' : 'star-outline'}
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
};

export default ReviewListScreen;
