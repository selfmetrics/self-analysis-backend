import express from "express";
import episodesController from "../controllers/episodesController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Episodes
 *   description: 에피소드 및 질문 관리 API
 */

/**
 * @swagger
 * /episodes:
 *   post:
 *     summary: 기본 질문 생성
 *     tags: [Episodes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateEpisodeRequest'
 *     responses:
 *       200:
 *         description: 기본 질문 목록 반환
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InitialQuestionsResponse'
 */
router.post("/", episodesController.createEpisode);

/**
 * @swagger
 * /episodes/complete:
 *   post:
 *     summary: 에피소드 + 질문 + 답변 한번에 저장
 *     tags: [Episodes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateEpisodeCompleteRequest'
 *     responses:
 *       200:
 *         description: 저장 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EpisodeDetail'
 */
router.post("/complete", episodesController.createEpisodeComplete)

/**
 * @swagger
 * /episodes:
 *   get:
 *     summary: 에피소드 리스트 조회
 *     tags: [Episodes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EpisodeListResponse'
 */
router.get("/", episodesController.getEpisodes);

/**
 * @swagger
 * /episodes/{id}:
 *   get:
 *     summary: 에피소드 상세 조회 (질문 포함)
 *     tags: [Episodes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EpisodeDetail'
 */
router.get("/:id", episodesController.getEpisodeById);

/**
 * @swagger
 * /episodes/{id}:
 *   patch:
 *     summary: 에피소드 수정
 *     tags: [Episodes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateEpisodeRequest'
 *     responses:
 *       200:
 *         description: 수정 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EpisodeDetail'
 */
router.patch("/:id", episodesController.updateEpisode);

/**
 * @swagger
 * /episodes/{id}:
 *   delete:
 *     summary: 에피소드 삭제
 *     tags: [Episodes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 삭제 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 */
router.delete("/:id", episodesController.deleteEpisode);

/**
 * @swagger
 * /episodes/{episodeId}/questions:
 *   post:
 *     summary: 질문 추가
 *     tags: [Episodes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: episodeId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateQuestionRequest'
 *     responses:
 *       200:
 *         description: 질문 생성 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EpisodeQuestion'
 */
router.post("/:episodeId/questions", episodesController.createQuestion);

/**
 * @swagger
 * /questions/{questionId}/answer:
 *   patch:
 *     summary: 질문 답변 수정
 *     tags: [Episodes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: questionId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateAnswerRequest'
 *     responses:
 *       200:
 *         description: 답변 수정 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EpisodeQuestion'
 */
router.patch("/questions/:questionId/answer", episodesController.updateAnswer);

/**
 * @swagger
 * /questions/{questionId}:
 *   delete:
 *     summary: 질문 삭제
 *     tags: [Episodes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: questionId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 삭제 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 */
router.delete("/questions/:questionId", episodesController.deleteQuestion);

export default router;