import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const GroupScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>👥 그룹 페이지 (추후 구현 예정)</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fdfbf7', justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 16, color: '#3b3025' },
});

export default GroupScreen;
