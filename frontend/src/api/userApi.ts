// src/api/userApi.ts
import { API } from "./api";

export const userApi = {
    // 🔥 로그인한 사용자 정보
    getMyInfo: async () => {
        const res = await API.get("/api/users/me");
        return res.data;
    },

    // 🔥 소개글 업데이트
    updateIntroduce: async (introduce: string) => {
        const res = await API.put("/api/users/introduce", {
            introduce,
        });
        return res.data;
    },

    // ⭐ 유저 검색
    search: async (keyword: string) => {
        const res = await API.get("/api/users/search", {
            params: { keyword },
        });
        return res.data;
    },

    // ⭐ 특정 유저 프로필 조회
    getUserById: async (userId: number) => {
        const res = await API.get(`/api/users/${userId}`);
        return res.data;
    },

// ⭐ 팔로우하기 (백엔드 URL에 맞게 수정)
    follow: async (userId: number) => {
        const res = await API.post(`/api/follow/${userId}`);
        return res.data;
    },

// ⭐ 언팔로우하기
    unfollow: async (userId: number) => {
        const res = await API.delete(`/api/follow/${userId}`);
        return res.data;
    },
};
