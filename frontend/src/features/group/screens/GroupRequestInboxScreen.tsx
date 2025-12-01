import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { decode as base64_decode } from "base-64";
import React, { useEffect, useState } from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export default function GroupRequestInboxScreen({ route, navigation }: any) {
    const { groupId } = route.params;

    const [requests, setRequests] = useState<any[]>([]);
    const [userId, setUserId] = useState<number | null>(null);

    /** JWT → userId 추출 */
    const loadUser = async () => {
        const token = await AsyncStorage.getItem("accessToken");
        if (!token) return;

        const payload = JSON.parse(
            base64_decode(token.split(".")[1].padEnd(4, "="))
        );

        setUserId(payload.userId);
    };

    useEffect(() => {
        loadUser();
    }, []);

    useEffect(() => {
        if (userId) loadRequests(userId);
    }, [userId]);

    /** 요청 목록 불러오기 */
    const loadRequests = async (leaderId: number) => {
        try {
            const token = await AsyncStorage.getItem("accessToken");

            const res = await axios.get(
                `${BASE_URL}/api/groups/${groupId}/pending`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                    params: { leaderId },
                }
            );

            setRequests(res.data);
        } catch (e) {
            console.log("🔥 Request load error:", e);
        }
    };

    /** 승인 */
    const approve = async (memberId: number) => {
        try {
            const token = await AsyncStorage.getItem("accessToken");

            await axios.post(
                `${BASE_URL}/api/groups/members/${memberId}/approve`,
                { leaderId: userId },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            loadRequests(userId!!);
        } catch (e) {
            console.log("🔥 Approve error:", e);
        }
    };

    /** 거절 */
    const reject = async (memberId: number) => {
        try {
            const token = await AsyncStorage.getItem("accessToken");

            await axios.post(
                `${BASE_URL}/api/groups/members/${memberId}/reject`,
                { leaderId: userId },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            loadRequests(userId!!);
        } catch (e) {
            console.log("🔥 Reject error:", e);
        }
    };

    const renderItem = ({ item }: any) => (
        <View style={styles.card}>
            <Text style={styles.nickname}>{item.nickname}</Text>

            <View style={styles.buttonRow}>
                <TouchableOpacity
                    style={styles.approveBtn}
                    onPress={() => approve(item.id)}
                >
                    <Text style={styles.btnText}>승인</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.rejectBtn}
                    onPress={() => reject(item.id)}
                >
                    <Text style={styles.btnText}>거절</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>가입 요청함</Text>

            <FlatList
                data={requests}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                ListEmptyComponent={
                    <Text style={styles.emptyMsg}>대기 중인 요청이 없습니다.</Text>
                }
            />
        </View>
    );
}

/* -------------------------------------------
      ✅ 앱 기본 스타일과 완전히 통합된 스타일
------------------------------------------- */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: "700",
        marginBottom: 15,
        color: "#222",
    },
    card: {
        backgroundColor: "#FAFAFA",
        borderRadius: 14,
        padding: 18,
        marginBottom: 14,
        borderWidth: 1,
        borderColor: "#EDEDED",
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
    nickname: {
        fontSize: 17,
        fontWeight: "600",
        marginBottom: 12,
        color: "#333",
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: 12,
    },
    approveBtn: {
        backgroundColor: "#FF7A00", // 주황 포인트 색
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 10,
    },
    rejectBtn: {
        backgroundColor: "#B0B0B0", // 중립 회색 버튼
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 10,
    },
    btnText: {
        color: "#FFFFFF",
        fontWeight: "600",
        fontSize: 14,
    },
    emptyMsg: {
        marginTop: 40,
        textAlign: "center",
        color: "#888",
        fontSize: 15,
    },
});
