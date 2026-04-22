import express from "express";
import interviewController from "../controllers/interviewController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Interview
 *   description: 면접 질문 관리 API
 */

/**
 * @swagger
 * /interview-questions:
 *   post:
 *     summary: 면접 질문 생성
 *     tags: [Interview]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateInterviewQuestionRequest'
 *     responses:
 *       200:
 *         description: 생성 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InterviewQuestion'
 *       400:
 *         description: 잘못된 요청
 */
router.post("/", interviewController.createQuestion);

/**
 * @swagger
 * /interview-questions:
 *   get:
 *     summary: 면접 질문 리스트 조회
 *     tags: [Interview]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InterviewQuestionListResponse'
 *       400:
 *         description: 잘못된 요청
 */
router.get("/", interviewController.getQuestions);

/**
 * @swagger
 * /interview-questions/{questionId}:
 *   get:
 *     summary: 면접 질문 상세 조회
 *     tags: [Interview]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: questionId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 질문 ID
 *     responses:
 *       200:
 *         description: 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InterviewQuestion'
 *       400:
 *         description: 잘못된 요청
 */
router.get("/:questionId", interviewController.getQuestionById);

/**
 * @swagger
 * /interview-questions/{questionId}:
 *   patch:
 *     summary: 면접 질문 및 답변 수정
 *     tags: [Interview]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: questionId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 질문 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateInterviewQuestionRequest'
 *     responses:
 *       200:
 *         description: 수정 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InterviewQuestion'
 *       400:
 *         description: 잘못된 요청
 */
router.patch("/:questionId", interviewController.updateQuestion);

/**
 * @swagger
 * /interview-questions/{questionId}:
 *   delete:
 *     summary: 면접 질문 삭제
 *     tags: [Interview]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: questionId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 질문 ID
 *     responses:
 *       200:
 *         description: 삭제 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 *       400:
 *         description: 잘못된 요청
 */
router.delete("/:questionId", interviewController.deleteQuestion);

export default router;