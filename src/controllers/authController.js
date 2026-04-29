import { getGoogleAuthUrl, getGoogleToken, getGoogleUser } from "../services/authService.js";
import { createJWT } from "../utils/jwt.js";
import { created } from "../utils/responses.js";

export const googleLogin = async (req, res, next) => {
  try {
    const url = getGoogleAuthUrl();
    return res.redirect(url);
  } catch (err) {
    next(err);
  }
};

export const googleCallback = async (req, res, next) => {
  try {
    const code = req.query.code;

    // 구글 토큰 요청
    const tokenData = await getGoogleToken(code);

    // access token 꺼내오기
    const accessToken = tokenData.access_token;

    // 유저 정보 요청
    const user = await getGoogleUser(accessToken);

    // JWT 생성
    const token = createJWT(user);

    return created(res, {
      token,
      user : {
        id : user.id.toString(),
        email : user.email,
        nickname : user.nickname
      }
    }, "로그인에 성공하였습니다.")
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res, next) => {
  try {
    const url = authService.getGoogleAuthUrl();
    return res.redirect(url);
  } catch (err) {
    next(err);
  }
};