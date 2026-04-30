import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

// JWT 생성
export const createJWT = (user) => {
    if (!JWT_SECRET) {
        throw new Error("JWT_SECRET이 설정되지 않았습니다.");
    }

    const payload = {
        userId: user.id.toString(), // 이후 조회 시 BigInt() 변환 필요.
    };

    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
    });
};

// JWT 검증
export const verifyJWT = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        const err = new Error("유효하지 않은 토큰입니다.");
        err.status = 401;
    }
};