import { createEpisode, createEpisodeWithQuestions, findEpisodes, findEpisodeById, updateEpisode, deleteEpisodeById, createQuestion, updateQuestionAnswer, deleteQuestionById } from "../repositories/episodeRepository.js";

export const createEpisodeService = async(userId, type) => {
    return await createEpisode(userId);
};

export const createEpisodeCompleteService = async(userId, episodeId, date, title, content, emotion, emotionIntensity, answers) => {
    return await createEpisodeWithQuestions(userId, episodeId, date, title, content, emotion, emotionIntensity, answers);
};

export const getEpisodesService = async(userId, startDate, endDate) => {
    return await findEpisodes(userId, startDate, endDate);
};

export const getEpisodeByIdService = async(userId, id) => {
    return await findEpisodeById(userId, id);
};

export const updateEpisodeService = async(userId, id, updateData) => {
    return await updateEpisode(userId, id, updateData)
};

export const deleteEpisodeService = async(userId, id) => {
    return await deleteEpisodeById(userId, id);
};

export const createQuestionService = async(userId, id, question) => {
    return await createQuestion(userId, id, question);
};

export const updateAnswerService = async(userId, episodeId, questionId, answer) => {
    return await updateQuestionAnswer(userId, episodeId, questionId, answer);
};

export const deleteQuestionService = async(userId, questionId) => {
    return await deleteQuestionById(userId, questionId);
};