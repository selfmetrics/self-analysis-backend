import prisma from "../lib/prisma.js";

export const createEpisode = async(userId) => {
    // 에피소드 생성
    const episode = await prisma.episode.create({
        data : {
            userId,
            title : "새로운 에피소드",
            eventDate : new Date(),
            emotion : "긍정",
            emotionScore : 1
        }
    });

    // 질문 전부 가져오기
    const question = await prisma.questionTemplate.findMany({
        where: {
            OR: [
                { userId: null },
                { userId: userId }
            ]
        }
    });

    return {
        episodeId : Number(episode.id),
        question : question.map(q => ({
            id : Number(q.id),
            question : q.question
        }))
    };
};

export const createEpisodeWithQuestions = async(userId, episodeId, date, title, content, emotion, emotionIntensity, answers) => {
    // 에피소드 업데이트
    const episode = await prisma.episode.update({
        where : {
            id : BigInt(episodeId),
            userId
        },
        data : {
            title,
            content,
            emotion,
            eventDate: new Date(date),
            emotionScore: emotionIntensity
        } 
    });

    // 답변 업데이트
    const answerData = answers.map(a => ({
        episodeId : BigInt(episodeId),
        questionId : BigInt(a.questionId),
        answer : a.answer
    }));
    await prisma.episodeAnswer.createMany({
        data : answerData
    });

    return {
        episodeId : Number(episodeId),
        date,
        title,
        content,
        emotion,
        emotionIntensity,
        question : answers
    }
};

export const findEpisodes = async(userId, startDate, endDate) => {
    // 에피소드 조회
    const episode = await prisma.episode.findMany({
        where : {
            userId, 
            eventDate : {
                gte : new Date(startDate),
                lte : new Date(endDate)
            }
        },
        orderBy: {
            eventDate: "desc"
        }
    });

    return episode.map(e => ({
        id: Number(e.id),
        date: e.eventDate,
        title: e.title,
        emotion: e.emotion,
        emotionIntensity: e.emotionScore
    }));
};

export const findEpisodeById = async(userId, id) => {
    // 에피소드 정보 및 질문 답변 가져오기
    const episode = await prisma.episode.findUnique({
        where : {
            userId, id
        },
        include : {
            answers : {
                include : {
                    question : true
                }
            }
        }
    });

    return {
        id: Number(episode.id), 
        date: episode.eventDate,
        title: episode.title,
        content: episode.content,
        emotion: episode.emotion,
        emotionIntensity: episode.emotionScore,
        questions: episode.answers.map((ans) => ({
            id: Number(ans.question.id),
            question: ans.question.question, 
            answer: ans.answer          
        }))
    };
};

export const updateEpisode = async() => {

};

export const deleteEpisodeById = async() => {

};

export const createQuestion = async() => {

};

export const updateQuestionAnswer = async() => {

};

export const deleteQuestionById = async() => {

};