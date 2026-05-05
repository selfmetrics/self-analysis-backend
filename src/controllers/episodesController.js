import { createEpisodeService, createEpisodeCompleteService, getEpisodesService, getEpisodeByIdService, updateEpisodeService, deleteEpisodeService, createQuestionService, updateAnswerService, deleteQuestionService } from "../services/episodeService.js";
import { success, noContent, created } from "../utils/responses.js";

export const createEpisode = async(req, res, next) => {
    try {
        const result = await createEpisodeService(req.userId, req.body.type);

        return success(res, result, "에피소드 기본 질문 반환에 완료하였습니다.");
    } catch (err) {
        next(err);
    }
};

export const createEpisodeComplete = async(req, res, next) => {
    try {
        const episodeId = req.params.id;
        const userId = req.userId;
        const { date, title, content, emotion, emotionIntensity, answers } = req.body;
        const result = await createEpisodeCompleteService(userId, episodeId, date, title, content, emotion, emotionIntensity, answers);
    
        return success(res, result, "에피소드 저장에 성공하였습니다.");
    } catch (err) {
        next(err);
    }
};

export const getEpisodes = async(req, res, next) => {
    try {
        let { startDate, endDate } = req.query;

        // 쿼리 값이 없을 경우 기본 한 달
        if (!startDate || !endDate) {
            endDate = new Date();
            startDate = new Date();
            startDate.setMonth(startDate.getMonth() - 1);
        }

        const result = await getEpisodesService(req.userId, startDate, endDate);
    
        return success(res, result, "에피소드 리스트 조회에 성공하였습니다.");
    } catch (err) {
        next(err);
    }
};

export const getEpisodeById = async(req, res, next) => {
    try {
        const result = await getEpisodeByIdService(req.userId, req.params.id);
    
        return success(res, result, "에피소드 상세 조회에 성공하였습니다.");
    } catch (err) {
        next(err);
    }
};

export const updateEpisode = async(req, res, next) => {
    try {
        const { date, title, content, emotion, emotionIntensity } = req.body;

        // 전처리
        const updateData = {
            ...(date !== undefined && { date }),
            ...(title !== undefined && { title }),
            ...(content !== undefined && { content }),
            ...(emotion !== undefined && { emotion }),
            ...(emotionIntensity !== undefined && {
                emotion_intensity: Number(emotionIntensity),
            }),
        };

        if (Object.keys(updateData).length === 0) {
            throw new Error("수정할 값이 없습니다.");
        }

        const result = await updateEpisodeService(req.userId, req.params.id, updateData);

        return success(res, result, "에피소드 수정에 성공하였습니다.");
    } catch (err) {
        next(err);
    }
};

export const deleteEpisode = async(req, res, next) => {
    try {
        const result = await deleteEpisodeService(req.userId, req.params.id);

        return noContent(res);
    } catch (err) {
        next(err);
    }
};

export const createQuestion = async(req, res, next) => {
    try {
        const result = await createQuestionService(req.userId, req.params.episodeId, req.body.question);

        return created(res, result, "질문을 추가하였습니다.");
    } catch (err) {
        next(err);
    }
};

export const updateAnswer = async(req, res, next) => {
    try {
        const result = await updateAnswerService(req.userId, req.params.episodeId, req.params.questionId, req.body.answer);
    
        return success(res, result, "답변 수정에 성공하였습니다.");
    } catch (err) {
        next(err);
    }
};

export const deleteQuestion = async(req, res, next) => {
    try {
        const result = await deleteQuestionService(req.userId, req.params.questionId);

        return noContent(res);
    } catch (err) {
        next(err);
    }
};