import express from 'express';
import { logger, errorMiddleware} from './middlewares/logger.js';
import swaggerUi from "swagger-ui-express";
import authRouter from "./routes/auth.js";
import usersRouter from "./routes/users.js";
import episodesRouter from "./routes/episodes.js";
import interviewQuestionsRouter from "./routes/interview.js";
import analyticsRouter from "./routes/analytics.js";
import { swaggerSpec } from "./docs/swagger.js";
import authMiddleware from './middlewares/authMiddleware.js';

const app = express();

app.use(express.json());
app.use(logger);  

// Swagger UI
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 회원 전용 라우터
app.use('/auth', authRouter);
app.use('/users', authMiddleware, usersRouter);

// 에피소드 전용 라우터
app.use('/episodes', authMiddleware, episodesRouter);

// // 면접 질문 전용 라우터
app.use('/interview-questions', authMiddleware, interviewQuestionsRouter);

// 그래프 라우터
app.use('/analytics', authMiddleware, analyticsRouter);

// 에러 처리 
app.use(errorMiddleware);

export default app;