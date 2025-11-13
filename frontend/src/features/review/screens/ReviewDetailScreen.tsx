import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
    Alert,
    Dimensions,
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ReviewDetailStyles as styles } from '../styles/ReviewDetailStyles'; // ✅ 분리된 스타일 import

const { width } = Dimensions.get('window');

const ReviewDetailScreen = ({ route }: { route: any }) => {
  const { review } = route.params;
  const [rating, setRating] = useState(4);

  const handleEdit = () => Alert.alert('수정', '수정 기능은 곧 연결됩니다 ✏️');
  const handleDelete = () => Alert.alert('삭제', '삭제 기능은 곧 연결됩니다 🗑️');
  const handleShare = () => Alert.alert('공유', '공유 기능은 곧 연결됩니다 🔗');

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
      >
        {/* 표지 */}
        <View style={styles.coverWrapper}>
          <Image
            source={{
              uri:
                review.image ||
                'https://upload.wikimedia.org/wikipedia/ko/0/0d/NorwegianWood.jpg',
            }}
            style={styles.coverImage}
          />
          <View style={styles.overlay} />
        </View>

        {/* 제목 */}
        <Text style={styles.title}>{review.title}</Text>

        {/* 별점 */}
        <View style={styles.ratingContainer}>
          <View style={styles.stars}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity key={star} onPress={() => setRating(star)}>
                <Text
                  style={[
                    styles.star,
                    rating >= star && styles.activeStar,
                    rating === star && styles.selectedStar,
                  ]}
                >
                  ★
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.ratingLabel}>{rating}.0 / 5.0</Text>
        </View>

        <View style={styles.titleDivider} />

        {/* 책 정보 */}
        <View style={styles.infoCard}>
          <Text style={styles.meta}>저자: 무라카미 하루키</Text>
          <Text style={styles.meta}>출판사: 문학사상사</Text>
          <Text style={styles.meta}>읽은 기간: 2025.09.28 ~ 2025.10.02</Text>
          <Text style={styles.date}>작성일: 2025년 10월 16일</Text>
        </View>

        {/* 본문 */}
        <Text style={styles.content}>
          {review.content ||
            '“노르웨이의 숲”은 청춘의 상처, 사랑, 그리고 상실을 깊이 있게 다루는 작품입니다. 감정의 결을 따라가다 보면, 문장 하나하나가 마음에 남아요.'}
        </Text>

        {/* 버튼 */}
        <View style={styles.buttonContainer}>
          {[
            { label: ' 수정', onPress: handleEdit },
            { label: ' 삭제', onPress: handleDelete },
            { label: ' 공유', onPress: handleShare },
          ].map((btn, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.actionButton}
              onPress={btn.onPress}
            >
              <Text style={styles.buttonText}>{btn.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ReviewDetailScreen;
