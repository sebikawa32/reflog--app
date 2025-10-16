import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const MyPageScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="dark" />
            <View style={styles.content}>
                <Text style={styles.title}>My Page</Text>
                <Text style={styles.subtitle}>여진님의 프로필 페이지입니다 ✨</Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        alignItems: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        color: '#3b3025',
    },
    subtitle: {
        fontSize: 14,
        color: '#9d8b7a',
        marginTop: 8,
    },
});

export default MyPageScreen;
