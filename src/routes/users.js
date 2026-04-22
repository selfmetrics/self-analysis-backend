import express from "express";
import usersController from "../controllers/usersController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: 사용자 관련 API
 */

/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: 마이페이지 조회
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 사용자 정보 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       400:
 *         description: 잘못된 요청
 */
router.get("/me", usersController.myPage);

/**
 * @swagger
 * /users/me:
 *   delete:
 *     summary: 회원 탈퇴
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 회원 탈퇴 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 *       400:
 *         description: 잘못된 요청
 */
router.delete("/me", usersController.deleteAccount);

/**
 * @swagger
 * /users/me:
 *   patch:
 *     summary: 닉네임 변경
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateNicknameRequest'
 *     responses:
 *       200:
 *         description: 닉네임 변경 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       400:
 *         description: 잘못된 요청
 */
router.patch("/me", usersController.nameChange);

export default router;