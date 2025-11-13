import axios from "axios";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const postApi = {
  //  공통 CRUD
  getAll: async () => {
    const res = await axios.get(`${API_URL}/api/posts`);
    return res.data;
  },

  getById: async (id: number) => {
    const res = await axios.get(`${API_URL}/api/posts/${id}`);
    return res.data;
  },

  create: async (data: any) => {
    const res = await axios.post(`${API_URL}/api/posts`, data);
    return res.data;
  },

  update: async (id: number, data: any) => {
    const res = await axios.put(`${API_URL}/api/posts/${id}`, data);
    return res.data;
  },

  remove: async (id: number) => {
    await axios.delete(`${API_URL}/api/posts/${id}`);
  },

  //  카테고리별 CRUD (책 / 영화 / 드라마 / 애니메이션 등)
  getByCategory: async (category: string) => {
    const res = await axios.get(`${API_URL}/api/posts?category=${category}`);
    return res.data;
  },

  createByCategory: async (category: string, data: any) => {
    const res = await axios.post(`${API_URL}/api/posts`, { ...data, category });
    return res.data;
  },

  updateByCategory: async (category: string, id: number, data: any) => {
    const res = await axios.put(`${API_URL}/api/posts/${id}`, { ...data, category });
    return res.data;
  },

  removeByCategory: async (category: string, id: number) => {
    await axios.delete(`${API_URL}/api/posts/${id}`);
  },
};
