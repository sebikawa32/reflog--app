import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { decode as base64_decode } from "base-64";
import React, { useCallback, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import FloatingButton from "../components/FloatingButton";
import { GroupListStyles as styles } from "../styles/GroupListStyles";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export default function GroupListScreen() {
    const navigation = useNavigation<any>();

    const [myGroups, setMyGroups] = useState<any[]>([]);

    /** 화면에 들어올 때마다 자동 새로고침 */
    useFocusEffect(
        useCallback(() => {
            loadMyGroups();
        }, [])
    );

    const loadMyGroups = async () => {
        const token = await AsyncStorage.getItem("accessToken");
        if (!token) return;

        const payload = JSON.parse(
            base64_decode(token.split(".")[1].padEnd(4, "="))
        );
        const userId = payload.userId;

        try {
            const res = await axios.get(`${BASE_URL}/api/groups/my`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setMyGroups(res.data);
        } catch (e) {
            console.log("My group load error:", e);
        }
    };

    const renderItem = ({ item }: any) => (
        <TouchableOpacity
            style={styles.groupCard}
            onPress={() =>
                navigation.navigate("Group", {
                    screen: "GroupDetail",
                    params: { groupId: item.id }
                })
            }
        >
            <Text style={styles.groupName}>{item.groupName}</Text>
            <Text style={styles.joined}>가입됨</Text>
        </TouchableOpacity>
    );
    

    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>내가 가입한 그룹</Text>

            <FlatList
                data={myGroups}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />

            <FloatingButton onPress={() => navigation.navigate("GroupExplore")} />
        </View>
    );
}
