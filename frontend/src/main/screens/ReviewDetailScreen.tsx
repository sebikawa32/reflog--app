import React, { useState } from 'react';
import {
View,
Text,
StyleSheet,
ScrollView,
Image,
TouchableOpacity,
Alert,
Dimensions,
        } from 'react-native';

        const { width } = Dimensions.get('window');

const ReviewDetailScreen = ({ route }: { route: any }) => {
        const { review } = route.params;
  const [rating, setRating] = useState(4);

  const handleEdit = () => Alert.alert('수정', '수정 기능은 곧 연결됩니다 ✏️');
  const handleDelete = () => Alert.alert('삭제', '삭제 기능은 곧 연결됩니다 🗑️');
  const handleShare = () => Alert.alert('공유', '공유 기능은 곧 연결됩니다 🔗');

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
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

        {/* 별점 (제목 아래로 이동) */}
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
        <Text style={styles.meta}>작성자: 여진 ✍️</Text>
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
        { label: '️ 삭제', onPress: handleDelete },
        { label: ' 공유', onPress: handleShare },
        ].map((btn, idx) => (
          <TouchableOpacity key={idx} style={styles.actionButton} onPress={btn.onPress}>
            <Text style={styles.buttonText}>{btn.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
        );
        };

        const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fdfbf7', padding: 20 },
    coverWrapper: {
        position: 'relative',
                alignItems: 'center',
                marginBottom: 25,
    },
    coverImage: {
        width: width * 0.85,
                height: 260,
                borderRadius: 16,
                resizeMode: 'cover',
                shadowColor: '#000',
                shadowOpacity: 0.2,
                shadowRadius: 10,
                elevation: 5,
    },
    overlay: {
        position: 'absolute',
                width: width * 0.85,
                height: 260,
                borderRadius: 16,
                backgroundColor: 'rgba(0,0,0,0.1)',
    },
    title: {
        fontSize: 26,
                fontWeight: '700',
                color: '#3b3025',
                textAlign: 'center',
                marginBottom: 8,
    },
    titleDivider: {
        width: 60,
                height: 3,
                backgroundColor: '#c8a97e',
                alignSelf: 'center',
                borderRadius: 3,
                marginVertical: 12,
    },
    infoCard: {
        backgroundColor: '#fff',
                borderRadius: 14,
                padding: 18,
                marginBottom: 25,
                shadowColor: '#000',
                shadowOpacity: 0.07,
                shadowRadius: 6,
                elevation: 2,
    },
    meta: {
        fontSize: 15,
                color: '#5a4a3c',
                marginBottom: 4,
    },
    date: {
        fontSize: 13,
                color: '#9d8b7a',
                marginTop: 5,
    },
    ratingContainer: {
        alignItems: 'center',
                marginBottom: 10,
    },
    ratingLabel: {
        fontSize: 15,
                fontWeight: '500',
                color: '#6b5a46',
                marginTop: 4,
    },
    stars: {
        flexDirection: 'row',
    },
    star: {
        fontSize: 30,
                color: '#d8cfc3',
                marginHorizontal: 3,
    },
    activeStar: {
        color: '#f2c94c',
    },
    selectedStar: {
        textShadowColor: '#f5d67a',
                textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 6,
    },
    content: {
        fontSize: 16,
                color: '#3e352c',
                lineHeight: 27,
                marginBottom: 25,
                paddingHorizontal: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
                justifyContent: 'space-around',
                marginBottom: 40,
    },
    actionButton: {
        borderRadius: 25,
                paddingVertical: 12,
                paddingHorizontal: 25,
                backgroundColor: '#c8a97e',
                shadowColor: '#000',
                shadowOpacity: 0.15,
                shadowRadius: 4,
                elevation: 3,
    },
    buttonText: {
        fontSize: 15,
                fontWeight: '600',
                color: '#fffaf2',
    },
});

export default ReviewDetailScreen;
