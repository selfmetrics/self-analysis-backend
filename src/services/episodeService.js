import { createEpisode, createEpisodeWithQuestions, findEpisodes, findEpisodeById, updateEpisode, deleteEpisodeById, createQuestion, updateQuestionAnswer, deleteQuestionById } from "../repositories/episodeRepository.js";

export const createEpisodeService = async(userId, type) => {
    return await createEpisode(userId);
};

export const createEpisodeCompleteService = async(userId, episodeId, date, title, content, emotion, emotionIntensity, answers) => {
    return await createEpisodeWithQuestions(userId, episodeId, date, title, content, emotion, emotionIntensity, answers);
};

export const getEpisodesService = async() => {

};

export const getEpisodeByIdService = async() => {

};

export const updateEpisodeService = async() => {

};

export const deleteEpisodeService = async() => {

};

export const createQuestionService = async() => {

};

export const updateAnswerService = async() => {

};

export const deleteQuestionService = async() => {

};