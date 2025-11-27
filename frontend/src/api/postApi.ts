// src/api/postApi.ts
import { API } from "./api";

export const postApi = {
  // 전체 조회
  getAll: async () => {
    const res = await API.get("/api/posts");
    return res.data;
  },

  // 단건 조회
  getById: async (id: number) => {
    const res = await API.get(`/api/posts/${id}`);
    return res.data;
  },

  // 생성
  create: async (data: any) => {
    const res = await API.post("/api/posts", data);
    return res.data;
  },

  // 수정
  update: async (id: number, data: any) => {
    const res = await API.put(`/api/posts/${id}`, data);
    return res.data;
  },

  // 삭제
  remove: async (id: number) => {
    await API.delete(`/api/posts/${id}`);
  },

  // 카테고리 기반 조회
  getByCategory: async (category: string) => {
    const res = await API.get(`/api/posts?category=${category}`);
    return res.data;
  },

  // 🔥 내가 쓴 감상기록 조회 (HomeScreen에서 사용)
  getByUserId: async (userId: number) => {
    const res = await API.get(`/api/posts?userId=${userId}`);
    return res.data;
  },
};
