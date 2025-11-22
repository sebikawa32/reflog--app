import axios from "axios";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export const fetchFollowingFeed = async () => {
    const res = await axios.get(`${BASE_URL}/api/feed/following`);
    return res.data;
};
