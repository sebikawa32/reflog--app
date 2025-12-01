import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { ProfileEditStyles as styles } from "../styles/ProfileEditStyles";

import {
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;
const DEFAULT_IMG = "https://cdn-icons-png.flaticon.com/512/847/847969.png";

export default function ProfileEditScreen() {
    const route = useRoute<any>();
    const navigation = useNavigation<any>();

    const { user } = route.params;

    const [nickname, setNickname] = useState(user.nickname);
    const [email] = useState(user.email);
    const [profileImage, setProfileImage] = useState(user.profileImg || DEFAULT_IMG);

    const pickImage = async () => {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) {
            alert("갤러리 접근 권한이 필요합니다.");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        });

        if (!result.canceled) {
            setProfileImage(result.assets[0].uri);
        }
    };

    const handleSave = async () => {
        try {
            const token = await AsyncStorage.getItem("accessToken");

            await axios.put(
                `${BASE_URL}/api/users/me`,
                {
                    id: user.id,
                    email: email,
                    nickname: nickname,
                    profileImg: profileImage
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            navigation.goBack();
        } catch (e) {
            console.log("❌ 프로필 수정 오류:", e);
        }
    };

    return (
        <View style={styles.container}>
            {/* 프로필 이미지 */}
            <View style={styles.imageWrapper}>
                <Image source={{ uri: profileImage }} style={styles.profileImage} />

                <TouchableOpacity style={styles.editIconWrapper} onPress={pickImage}>
                    <Ionicons name="pencil" size={18} color="#fff" />
                </TouchableOpacity>
            </View>

            {/* 입력 영역 */}
            <View style={styles.inputBox}>
                <Text style={styles.label}>닉네임</Text>
                <TextInput
                    style={styles.input}
                    value={nickname}
                    onChangeText={setNickname}
                />

                <Text style={styles.label}>이메일</Text>
                <TextInput
                    style={[styles.input, styles.disabledInput]}
                    value={email}
                    editable={false}
                />
            </View>

            {/* 저장 버튼 */}
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>저장하기</Text>
            </TouchableOpacity>
        </View>
    );
}
