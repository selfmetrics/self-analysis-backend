import { updateQuestionAnswer } from "../repositories/episodeRepository.js";
import { createInterviewQuestion, findInterviewQuestions, findInterviewQuestionById, updateInterviewQuestion, deleteInterviewQuestionById } from "../repositories/interviewRepository.js";

export const createInterviewQuestionService = async(userId, question) => {
    return createInterviewQuestion(userId, question);
};

export const getInterviewQuestionsService = async(userId) => {
    return findInterviewQuestions(userId);
};

export const getInterviewQuestionByIdService = async(userId, questionId) => {
    return findInterviewQuestionById(userId, questionId);
};

export const updateInterviewQuestionService = async(userId, questionId, question, answer) => {
    return updateInterviewQuestion(userId, questionId, question, answer);
};

export const deleteInterviewQuestionService = async(userId, questionId) => {
    return deleteInterviewQuestionById(userId, questionId);
};
