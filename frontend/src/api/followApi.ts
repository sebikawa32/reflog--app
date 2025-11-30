import { API } from "./api";

export const followApi = {
    getFollowers: async (userId: number) => {
        const res = await API.get(`/api/follow/${userId}/followers`);
        return res.data;
    },

    getFollowings: async (userId: number) => {
        const res = await API.get(`/api/follow/${userId}/followings`);
        return res.data;
    }
};
