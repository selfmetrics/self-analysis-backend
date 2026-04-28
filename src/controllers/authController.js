import { getGoogleAuthUrl, getGoogleToken, getGoogleUser } from "../services/authService.js";


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
    const userInfo = await getGoogleUser(accessToken);

    // JWT 생성
    const jwt = createJWT(userInfo);
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