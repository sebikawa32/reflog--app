import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    FlatList,
    SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../../App';

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
            {/* 상단 프로필 */}
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

            {/* 카테고리 선택 */}
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    profileContainer: {
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        paddingVertical: 24,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 3,
        marginBottom: 20,
    },
    profileImage: {
        width: 90,
        height: 90,
        borderRadius: 45,
        marginBottom: 12,
    },
    profileName: {
        fontSize: 20,
        fontWeight: '700',
        color: '#3B3025',
    },
    statsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
    },
    statsText: {
        fontSize: 14,
        color: '#6B5F52',
    },
    dot: {
        fontSize: 14,
        color: '#AFA9A1',
        marginHorizontal: 6,
    },
    profileBio: {
        fontSize: 13,
        color: '#8D8174',
        fontStyle: 'italic',
        textAlign: 'center',
    },
    categorySection: {
        flex: 1,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#3B3025',
        marginBottom: 12,
    },
    categoryCard: {
        flex: 1,
        backgroundColor: '#F9F7F3',
        marginBottom: 16,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 40,
        marginHorizontal: 6,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    categoryText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#5A4A3C',
    },
});

export default HomeScreen;
