import prisma from "../lib/prisma.js";

export const findOrCreateUser = async (email, provider, providerId, nickname) => {
    try {
        // 기존 유저 찾기 (탈퇴 안 한 유저)
        let user = await prisma.user.findFirst({
            where: {
                provider,
                providerId,
                deletedAt: null
            }
        });

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
    } catch (error) {
        throw new Error("로그인 도중 연결에 실패하였습니다.");
    }
};