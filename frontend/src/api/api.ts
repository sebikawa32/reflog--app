// src/api/api.ts
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const API = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL,
});

// 🔥 모든 요청에 JWT 자동 포함
API.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem("accessToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
