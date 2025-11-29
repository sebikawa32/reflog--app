import axios from "axios";
import { EXPO_PUBLIC_API_URL } from "@env";

export const followApi = {
    getFollowers: async (userId: number) => {
        const res = await axios.get(`${EXPO_PUBLIC_API_URL}/api/follow/${userId}/followers`);
        return res.data;
    },

    getFollowings: async (userId: number) => {
        const res = await axios.get(`${EXPO_PUBLIC_API_URL}/api/follow/${userId}/followings`);
        return res.data;
    }
};
