import express from "express";
import analyticsController from "../controllers/analyticsController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Analytics
 *   description: 감정 분석 API
 */

/**
 * @swagger
 * /analytics/emotions:
 *   get:
 *     summary: 감정 통계 조회
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: startDate
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: endDate
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: 감정 통계
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EmotionAnalyticsResponse'
 */
router.get("/emotions", analyticsController.getEmotions);

export default router;