import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

/** 🔹 피드 상세 조회 */
export const getFeedDetail = async (feedId: number) => {
    const token = await AsyncStorage.getItem("accessToken");

    return axios.get(`${BASE_URL}/api/group-feed/detail/${feedId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

/** 🔹 리뷰 생성 */
export const createReview = async (data: any) => {
    const token = await AsyncStorage.getItem("accessToken");

    return axios.post(`${BASE_URL}/api/group-feed/review/create`, data, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

/** 🔹 리뷰 목록 조회 */
export const getReviews = async (feedId: number) => {
    const token = await AsyncStorage.getItem("accessToken");

    return axios.get(`${BASE_URL}/api/group-feed/review/${feedId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

/** 🔹 리뷰 수정 */
export const updateReview = async (feedId: number, params: any) => {
    const token = await AsyncStorage.getItem("accessToken");

    return axios.put(`${BASE_URL}/api/group-feed/review/${feedId}`, null, {
        params,
        headers: { Authorization: `Bearer ${token}` },
    });
};

/** 🔹 리뷰 삭제 */
export const deleteReview = async (feedId: number, userId: number) => {
    const token = await AsyncStorage.getItem("accessToken");

    return axios.delete(`${BASE_URL}/api/group-feed/review/${feedId}`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { userId },
    });
};
