import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export default function GroupRequestInboxScreen({ route, navigation }: any) {
    const { groupId } = route.params;
    const isFocused = useIsFocused();

    const [requests, setRequests] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [leaderId, setLeaderId] = useState<number | null>(null);

    /** 🔥 JWT → leaderId 추출 */
    const loadLeader = async () => {
        const token = await AsyncStorage.getItem("accessToken");
        if (!token) return;

        const payload = JSON.parse(
            atob(token.split(".")[1].padEnd(4, "="))
        );

        setLeaderId(payload.userId);
    };

    /** 🔥 요청 목록 조회 (백엔드 컨트롤러 그대로 적용) */
    const loadRequests = async () => {
        try {
            if (!leaderId) return;

            setLoading(true);
            const token = await AsyncStorage.getItem("accessToken");

            const res = await axios.get(
                `${BASE_URL}/api/groups/${groupId}/pending?leaderId=${leaderId}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            setRequests(res.data);
        } catch (e) {
            console.log("❌ 요청 목록 조회 실패:", e);
        } finally {
            setLoading(false);
        }
    };

    /** 🔥 승인 (memberId 사용) */
    const approve = async (memberId: number) => {
        try {
            const token = await AsyncStorage.getItem("accessToken");

            await axios.post(
                `${BASE_URL}/api/groups/members/${memberId}/approve`,
                { leaderId },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setRequests((prev) => prev.filter((r) => r.id !== memberId));
        } catch (e) {
            console.log("❌ 승인 실패:", e);
        }
    };

    /** 🔥 거절 (memberId 사용) */
    const reject = async (memberId: number) => {
        try {
            const token = await AsyncStorage.getItem("accessToken");

            await axios.post(
                `${BASE_URL}/api/groups/members/${memberId}/reject`,
                { leaderId },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setRequests((prev) => prev.filter((r) => r.id !== memberId));
        } catch (e) {
            console.log("❌ 거절 실패:", e);
        }
    };

    /** 🔥 자동 새로고침 */
    useEffect(() => {
        loadLeader(); 
    }, []);

    useEffect(() => {
        if (isFocused && leaderId) {
            loadRequests();
        }
    }, [isFocused, leaderId]);

    if (loading) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <ScrollView style={{ flex: 1, padding: 20, backgroundColor: "#fff" }}>
            <Text
                style={{
                    fontSize: 22,
                    fontWeight: "700",
                    marginBottom: 20,
                }}
            >
                요청 수신함
            </Text>

            {requests.length === 0 ? (
                <Text
                    style={{
                        fontSize: 16,
                        color: "#888",
                        textAlign: "center",
                        marginTop: 30,
                    }}
                >
                    대기 중인 요청이 없습니다.
                </Text>
            ) : (
                requests.map((req) => (
                    <View
                        key={req.id}
                        style={{
                            backgroundColor: "#f9f9f9",
                            padding: 16,
                            borderRadius: 12,
                            marginBottom: 14,
                            shadowColor: "#000",
                            shadowOpacity: 0.05,
                            shadowRadius: 3,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 16,
                                fontWeight: "600",
                                marginBottom: 10,
                            }}
                        >
                            {req.nickname}
                        </Text>

                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "flex-end",
                                gap: 10,
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => approve(req.id)}
                                style={{
                                    backgroundColor: "#FF7A00",
                                    paddingVertical: 8,
                                    paddingHorizontal: 16,
                                    borderRadius: 8,
                                }}
                            >
                                <Text style={{ color: "#fff", fontWeight: "700" }}>
                                    수락
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => reject(req.id)}
                                style={{
                                    backgroundColor: "#ccc",
                                    paddingVertical: 8,
                                    paddingHorizontal: 16,
                                    borderRadius: 8,
                                }}
                            >
                                <Text style={{ color: "#333", fontWeight: "700" }}>
                                    거절
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))
            )}
        </ScrollView>
    );
}
