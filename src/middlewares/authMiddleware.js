import { verifyJWT } from "../utils/jwt.js";

export default authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            const err = new Error("토큰이 없습니다.");
            err.status = 401;
        }

        // Bearer Token 중 Token만 가져와 검증
        const token = authHeader.split(" ")[1];

        const decoded = verifyJWT(token);

        // req에 사용자 정보 넣기
        req.userId = BigInt(decoded.userId);

        next();
    } catch (err) {
        next(err);
    }
};