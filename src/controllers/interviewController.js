import { createInterviewQuestionService, getInterviewQuestionsService, getInterviewQuestionByIdService, updateInterviewQuestionService, deleteInterviewQuestionService } from "../services/interviewService.js";
import { created, noContent, success } from "../utils/responses.js";

export const createQuestion = async(req, res, next) => {
    try {
        const result = await createInterviewQuestionService(req.userId, req.body.question);

        return created(res, result, "면접 질문 생성에 성공하였습니다.");
    } catch (err) {
        next(err);
    }
};

export const getQuestions = async(req, res, next) => {
    try {
        const result = await getInterviewQuestionsService(req.userId);
        return success(res, result, "면접 질문 조회에 성공하였습니다.");
    } catch (err) {
        next(err);
    }
};

export const getQuestionById = async(req, res, next) => {
    try {
        const result = await getInterviewQuestionByIdService(req.userId, req.params.questionId);
    
        return success(res, result, "면접 상세 조회에 성공하였습니다.");
    } catch (err) {
        next(err);
    }
};

export const updateQuestion = async(req, res, next) => {
    try {
        const result = await updateInterviewQuestionService(req.userId, req.params.questionId, req.body.question, req.body.answer);

        return success(res, result, "질문 답변 수정에 성공하였습니다.");
    } catch (err) {
        next(err);
    }
};

export const deleteQuestion = async(req, res, next) => {
    try {
        const result = await deleteInterviewQuestionService(req.userId, req.params.questionId);
    
        return noContent(res);
    } catch (err) {
        next(err);
    }
};