import * as React from 'react';
import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

// --- 화면 import ---
import HomeScreen from './src/features/review/screens/HomeScreen';
import ReviewDetailScreen from './src/features/review/screens/ReviewDetailScreen';
import ReviewListScreen from './src/features/review/screens/ReviewListScreen';
import MyPageScreen from './src/features/user/screens/MyPageScreen';
import SettingsScreen from './src/features/user/screens/SettingsScreen';

// 스플래시 화면 자동숨김 방지 (폰트 로딩 끝나기 전까지 유지)
SplashScreen.preventAutoHideAsync();

// --- 네비게이션 타입 ---
export type RootStackParamList = {
    HomeTabs: undefined;
    ReviewList: { category: string };
    ReviewDetail: {
        review: {
            id: string;
            title: string;
            content: string;
            image?: string;
            rating?: number;
        };
    };
};

// --- 네비게이터 선언 ---
const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

// --- 하단 탭 ---
function HomeTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: '#C8A97E',
                tabBarInactiveTintColor: '#B5B2AE',
                tabBarStyle: {
                    backgroundColor: '#FFFFFF',
                    borderTopWidth: 0.3,
                    borderTopColor: '#E5E3E0',
                    height: 60,
                    shadowColor: '#000',
                    shadowOpacity: 0.04,
                    shadowRadius: 4,
                    elevation: 2,
                },
                tabBarIcon: ({ color }) => {
                    let iconName: keyof typeof Ionicons.glyphMap = 'home-outline';
                    if (route.name === 'Home') iconName = 'home-outline';
                    else if (route.name === 'My') iconName = 'person-outline';
                    else if (route.name === 'Settings') iconName = 'settings-outline';
                    return <Ionicons name={iconName} size={22} color={color} />;
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '500',
                    marginBottom: 4,
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} options={{ title: '피드' }} />
            <Tab.Screen name="My" component={MyPageScreen} options={{ title: 'My' }} />
            <Tab.Screen name="Settings" component={SettingsScreen} options={{ title: '설정' }} />
        </Tab.Navigator>
    );
}

// --- 앱 메인 ---
export default function App() {
    const [fontsLoaded] = useFonts({
        // Ionicons 폰트 로드
        Ionicons: require('@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.ttf'),
    });

    // 폰트 로드 완료 시 스플래시 숨기기
    useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) return null; // 로딩 중엔 아무것도 표시 X

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="HomeTabs">
                <Stack.Screen
                    name="HomeTabs"
                    component={HomeTabs}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ReviewList"
                    component={ReviewListScreen}
                    options={{
                        headerShown: true,
                        title: '리뷰 목록',
                        headerTintColor: '#2F2B28',
                        headerStyle: { backgroundColor: '#FFFFFF' },
                        headerTitleStyle: { fontWeight: '600' },
                    }}
                />
                <Stack.Screen
                    name="ReviewDetail"
                    component={ReviewDetailScreen}
                    options={{
                        headerShown: true,
                        title: '상세 보기',
                        headerTintColor: '#2F2B28',
                        headerStyle: { backgroundColor: '#FFFFFF' },
                        headerTitleStyle: { fontWeight: '600' },
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
