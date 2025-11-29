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
};
