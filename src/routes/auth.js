import express from "express";
import { googleCallback, logout, googleLogin } from "../controllers/authController.js";
import { validateGoogleCallback } from "../middlewares/validate.js";

const router = express.Router();

/**
 * @swagger
 * tags: 
 *   name : Auth
 *   description : 인증 관련 API (로그인, 콜백, 로그아웃)
 */


/**
 * @swagger
 * /auth/google:
 *   get:
 *     summary: 구글 로그인
 *     description: 구글 OAuth 로그인 페이지로 리다이렉트
 *     tags: [Auth]
 *     responses:
 *       302:
 *         description: 구글 로그인 페이지로 이동
 *       400:
 *         description: 잘못된 요청
 */
router.get("/google", googleLogin);

/**
 * @swagger
 * /auth/google/callback:
 *   get:
 *     summary: 구글 OAuth 콜백
 *     tags: [Auth]
 *     parameters:
 *       - in: query
 *         name: code
 *         required: true
 *         schema:
 *           type: string
 *         description: 구글 인증 코드
 *     responses:
 *       200:
 *         description: 로그인 성공 (JWT 발급)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       400:
 *         description: 인증 실패
 */
router.get("/google/callback", validateGoogleCallback, googleCallback);

export default router;