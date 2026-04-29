import prisma from "../lib/prisma.js";

export const findOrCreateUser = async ({ email, provider, providerId, nickname }) => {
    try {
        // 기존 유저 찾기
        let user = await prisma.user.findFirst({
            where: {
                provider,
                providerId
            }
        });
        console.log("✅ DB 연결 성공");

        // 없으면 생성
        if (!user) {
            user = await prisma.user.create({
                data: {
                    email,
                    provider,
                    providerId,
                    nickname
                }
            });
        }

        return user;
    } catch (err) {
        console.error("❌ DB 연결 실패");
    }
};