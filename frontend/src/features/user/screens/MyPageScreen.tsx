import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native"; // ⭐ 추가
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../../../navigation/RootNavigator";
import { MyPageStyles as styles } from "../styles/MyPageStyles";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export default function MyPageScreen({ navigation }: any) {
    const [user, setUser] = useState<any>(null);
    const { logout } = useAuth();

    useEffect(() => {
        loadUserInfo();
    }, []);

    // 🔥 페이지가 다시 포커스될 때 자동 새로고침
    useFocusEffect(
        React.useCallback(() => {
            loadUserInfo();
        }, [])
    );

    const loadUserInfo = async () => {
        try {
            const token = await AsyncStorage.getItem("accessToken");

            const res = await axios.get(`${BASE_URL}/api/users/me`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setUser(res.data);

        } catch (e: any) {
            console.log("❌ 사용자 정보 불러오기 오류:", e);

            if (e.response?.status === 403) {
                await logout();
                return;
            }
        }
    };

    if (!user) return <Text>로딩중...</Text>;

    return (
        <ScrollView style={styles.container}>
            {/* 프로필 헤더 */}
            <View style={styles.header}>
                <View style={styles.avatarWrapper}>
                    <Image
                        style={styles.avatar}
                        source={{
                            uri: user.profileImage || 
                                 "https://cdn-icons-png.flaticon.com/512/847/847969.png",
                        }}
                    />
                </View>

                <Text style={styles.name}>{user.nickname}</Text>
                <Text style={styles.email}>{user.email}</Text>

                {/* 프로필 수정 */}
                <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => navigation.navigate("ProfileEdit", { user })}
                >
                    <Text style={styles.editButtonText}>프로필 수정</Text>
                </TouchableOpacity>
            </View>

            {/* 통계 */}
            <View style={styles.statsBox}>
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>{user.reviewCount}</Text>
                    <Text style={styles.statLabel}>그룹</Text>
                </View>

                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>{user.postCount}</Text>
                    <Text style={styles.statLabel}>내 감상</Text>
                </View>

                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>{user.commentCount}</Text>
                    <Text style={styles.statLabel}>댓글</Text>
                </View>
            </View>

            {/* 계정 관리 */}
            <View style={styles.sectionBox}>
                <Text style={styles.sectionTitle}>계정 관리</Text>

                <TouchableOpacity style={styles.itemRow}>
                    <Text style={styles.itemText}>비밀번호 변경</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.itemRow}>
                    <Text style={styles.itemText}>SNS 연동 관리</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.itemRow}>
                    <Text style={styles.itemText}>알림 설정</Text>
                </TouchableOpacity>
            </View>

            {/* 앱 정보 */}
            <View style={styles.sectionBox}>
                <Text style={styles.sectionTitle}>앱 정보 / 정책</Text>

                <TouchableOpacity style={styles.itemRow}>
                    <Text style={styles.itemText}>서비스 이용약관</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.itemRow}>
                    <Text style={styles.itemText}>개인정보 처리방침</Text>
                </TouchableOpacity>
            </View>

            {/* 로그아웃 버튼 */}
            <TouchableOpacity
                style={styles.logoutButton}
                onPress={async () => {
                    try {
                        const token = await AsyncStorage.getItem("accessToken");

                        await axios.post(
                            `${BASE_URL}/api/logout`,
                            {},
                            { headers: { Authorization: `Bearer ${token}` } }
                        );
                    } catch (e) {
                        console.log("로그아웃 API 오류:", e);
                    }

                    await logout();
                }}
            >
                <Text style={styles.logoutText}>로그아웃</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}
