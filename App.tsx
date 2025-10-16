
import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons'; // ✅ expo 제거 후 변경

import HomeScreen from './src/main/screens/HomeScreen';
import ReviewListScreen from './src/main/screens/ReviewListScreen';
import ReviewDetailScreen from './src/main/screens/ReviewDetailScreen';
import GroupScreen from './src/main/screens/GroupScreen';
import MyScreen from './src/main/screens/MyScreen';
import SettingsScreen from './src/main/screens/SettingsScreen';

// 🔹 Stack 타입 정의
export type RootStackParamList = {
  Tabs: undefined;
  ReviewList: { category: string };
  ReviewDetail: {
    review: { id: string; title: string; content: string; image?: string };
  };
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarShowLabel: true,
      tabBarStyle: {
        backgroundColor: '#fff',
        borderTopWidth: 0.3,
        borderTopColor: '#ccc',
        height: 60,
        paddingBottom: 6,
      },
      tabBarIcon: ({ color, size }) => {
        let iconName: string = 'home-outline';
        if (route.name === 'Feed') iconName = 'home-outline';
        else if (route.name === 'Group') iconName = 'people-outline';
        else if (route.name === 'My') iconName = 'person-outline';
        else if (route.name === 'Settings') iconName = 'settings-outline';
        return <Icon name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#c8a97e',
      tabBarInactiveTintColor: '#999',
    })}
  >
    <Tab.Screen name="Feed" component={HomeScreen} options={{ title: '피드' }} />
    <Tab.Screen name="Group" component={GroupScreen} options={{ title: '그룹' }} />
    <Tab.Screen name="My" component={MyScreen} options={{ title: 'MY' }} />
    <Tab.Screen name="Settings" component={SettingsScreen} options={{ title: '설정' }} />
  </Tab.Navigator>
);

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* 🔹 탭바 포함된 메인 화면 */}
        <Stack.Screen
          name="Tabs"
          component={TabNavigator}
          options={{ headerShown: false }}
        />

        {/* 🔹 독후감 목록 */}
        <Stack.Screen
          name="ReviewList"
          component={ReviewListScreen}
          options={({ route }) => ({
            title: route.params?.category || '독후감 목록',
          })}
        />

        {/* 🔹 독후감 상세 */}
        <Stack.Screen
          name="ReviewDetail"
          component={ReviewDetailScreen}
          options={{ title: '독후감 상세보기', headerBackTitle: '뒤로' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
