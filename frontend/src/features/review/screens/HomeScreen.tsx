import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { RootStackParamList } from '../../../../App';
import { HomeStyles as styles } from '../styles/HomeStyles'; // ✅ 분리된 스타일 import

const categories = [
  { id: '1', name: '책', key: 'book' },
  { id: '2', name: '영화', key: 'movie' },
  { id: '3', name: '드라마', key: 'drama' },
  { id: '4', name: '애니메이션', key: 'animation' },
];

type HomeNavProp = NativeStackNavigationProp<RootStackParamList, 'HomeTabs'>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeNavProp>();

  return (
    <SafeAreaView style={styles.container}>
      {/* 프로필 */}
      <View style={styles.profileContainer}>
        <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
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

        <Text style={styles.profileBio}>오늘도 감상을 기록하며 성장 중 ✍️</Text>
      </View>

      {/* 카테고리 */}
      <View style={styles.categorySection}>
        <Text style={styles.sectionTitle}>카테고리</Text>
        <FlatList
          data={categories}
          numColumns={2}
          keyExtractor={(item) => item.id}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.categoryCard}
              activeOpacity={0.85}
              onPress={() =>
                navigation.navigate('ReviewList', { category: item.name })
              }
            >
              <Text style={styles.categoryText}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
