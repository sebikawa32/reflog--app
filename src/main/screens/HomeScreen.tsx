import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

const HomeScreen = () => {
  const [activeTab, setActiveTab] = useState<'Feed' | 'My' | 'Settings'>('Feed');

  return (
    <SafeAreaView style={styles.container}>
      {/* 상단 프로필 박스 */}
      <View style={styles.profileContainer}>
        <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
          }}
          style={styles.profileImage}
        />
        <View>
          <Text style={styles.profileName}>여진</Text>
          <Text style={styles.profileSub}>오늘도 감상을 기록해보세요 ✨</Text>
        </View>
      </View>

      {/* 본문 영역 */}
      <View style={styles.contentContainer}>
        {activeTab === 'Feed' && (
          <Text style={styles.placeholderText}>📚 피드 영역 (추후 게시물 목록)</Text>
        )}
        {activeTab === 'My' && (
          <Text style={styles.placeholderText}>👤 마이페이지</Text>
        )}
        {activeTab === 'Settings' && (
          <Text style={styles.placeholderText}>⚙️ 설정 화면</Text>
        )}
      </View>

      {/* 하단 탭바 */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => setActiveTab('Feed')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'Feed' && styles.activeTabText,
            ]}
          >
            🏠 피드
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => setActiveTab('My')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'My' && styles.activeTabText,
            ]}
          >
            👤 My
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => setActiveTab('Settings')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'Settings' && styles.activeTabText,
            ]}
          >
            ⚙️ 설정
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdfbf7',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 50,
    marginHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 3,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#3b3025',
  },
  profileSub: {
    fontSize: 14,
    color: '#9d8b7a',
    marginTop: 2,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 16,
    color: '#7a6a58',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderTopWidth: 0.5,
    borderTopColor: '#ddd',
  },
  tabItem: {
    alignItems: 'center',
  },
  tabText: {
    fontSize: 14,
    color: '#999',
    marginTop: 2,
  },
  activeTabText: {
    color: '#c8a97e',
    fontWeight: '600',
  },
});

export default HomeScreen;
