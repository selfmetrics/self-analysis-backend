import express from 'express';
import { logger, errorMiddleware} from './middlewares/logger';

const app = express();

app.use(express.json());
app.use(logger);  

// 회원 확인 미들웨어
// 

// 회원 전용 라우터
app.use('/auth', authRouter);
app.use('/users', usersRouter);

// 에피소드 전용 라우터
app.use('/episodes', episodesRouter);

// 면접 질문 전용 라우터
app.use('/interview-questions', interviewQuestionsRouter);

// 그래프 라우터
app.use('/analytics', analyticsRouter);

// 에러 처리 
app.use(errorMiddleware);

export default app;