import { verifyJWT } from "../utils/jwt.js";

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        // 헤더가 없는 경우
        if (!authHeader) {
            const err = new Error("토큰이 없습니다.");
            err.status = 401;
            return next(err);
        }

        // Bearer Token 중 Token만 가져와 검증
        const token = authHeader.split(" ")[1];

        // 토큰이 없는 경우
        if (!token) {
            const err = new Error("토큰이 없습니다.");
            err.status = 401;
            return next(err);
        }

        const decoded = verifyJWT(token);

        // req에 사용자 정보 넣기
        req.userId = BigInt(decoded.userId);

        next();
    } catch (err) {
        const error = new Error("토큰 확인에 실패하였습니다.");
        error.status = 401;
        next(error);
    }
};

export default authMiddleware;