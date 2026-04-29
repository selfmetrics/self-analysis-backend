import crypto from "crypto";
import axios from "axios";
import "dotenv/config";
import qs from "qs";
import { findOrCreateUser } from "../repositories/authRepository.js";

export const getGoogleAuthUrl = () => {
    const baseUrl = "https://accounts.google.com/o/oauth2/v2/auth";

    const clientId = process.env.GOOGLE_CLIENT_ID;
    const redirectUri = process.env.GOOGLE_REDIRECT_URI;

    if (!clientId || !redirectUri) {
        throw new Error("Google OAuth 환경변수가 설정되지 않았습니다.");
    }

    // CSRF 공격을 방지하기 위하여 state 저장
    const state = crypto.randomBytes(16).toString("hex");

    const params = new URLSearchParams({ 
        client_id: clientId, 
        redirect_uri: redirectUri, 
        response_type: "code", 
        scope: "openid email profile", 
        access_type: "offline", 
        prompt: "consent",
        state:state,
    });

    // 최종 URL 반환
    return `${baseUrl}?${params.toString()}`;
};

// code -> google Token 요청
export const getGoogleToken = async (code) => {
    const tokenUrl = "https://oauth2.googleapis.com/token";

    try {
        const response = await axios.post(tokenUrl, qs.stringify({
            code: code,
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            redirect_uri: process.env.GOOGLE_REDIRECT_URI,
            grant_type: "authorization_code",
        }));

        return response.data;
    } catch (err) {
        throw new Error("구글 accessToken 요청 실패");
    }
};

// accessToken -> 유저 정보 요청
export const getGoogleUser = async(accessToken) => {
    try {
        const response = await axios.get(
            "https://www.googleapis.com/oauth2/v2/userinfo",
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        const email = response.data.email;
        const provider = "google";
        const providerId = response.data.id;
        const nickname = response.data.name;

        return findOrCreateUser(email, provider, providerId, nickname);
    } catch (err) {
        throw new Error("구글 유저 정보 요청 실패");
    }
};