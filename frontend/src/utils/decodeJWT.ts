import { decode as base64Decode } from "base-64";

export function decodeJWT(token: string) {
    try {
        const payload = token.split(".")[1];
        const json = base64Decode(payload);
        return JSON.parse(json);
    } catch (e) {
        console.log("JWT decode error:", e);
        return null;
    }
}
