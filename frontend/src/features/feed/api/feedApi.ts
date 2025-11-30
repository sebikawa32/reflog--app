import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export const fetchFollowingFeed = async () => {
    const token = await AsyncStorage.getItem("accessToken");

    console.log("🔑 사용 토큰:", token);

    try {
        const res = await axios.get(`${BASE_URL}/api/feed/following`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        console.log("📌 피드 응답:", res.data);
        return res.data;
    } catch (err: any) {
        console.log("❌ 피드 API 에러:", err);
        throw err;
    }
};
