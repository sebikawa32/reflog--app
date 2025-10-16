import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SettingsScreen = () => (
    <View style={styles.container}>
        <Text style={styles.text}>⚙️ 설정 화면 (알림, 계정, 테마 등)</Text>
    </View>
);

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' },
    text: { fontSize: 16, color: '#3b3025' },
});

export default SettingsScreen;
