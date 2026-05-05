import prisma from "../lib/prisma.js";

export const createEpisode = async(userId) => {
    return await prisma.$transaction(async (tx) => {
        // 에피소드 생성
        const episode = await tx.episode.create({
            data : {
                userId,
                title : "새로운 에피소드",
                eventDate : new Date(),
                emotion : "긍정",
                emotionScore : 1
            }
        });

        // 질문 전부 가져오기
        const question = await tx.questionTemplate.findMany({
            where: {
                OR: [
                    { userId: null },
                    { userId: userId }
                ]
            }
        });

        // 미리 answer 생성
        await tx.episodeAnswer.createMany({
            data : question.map(q => ({
                episodeId : episode.id,
                questionId : q.id,
                answer : ""
            }))
        });

        return {
            episodeId : Number(episode.id),
            question : question.map(q => ({
                id : Number(q.id),
                question : q.question
            }))
        };
    });
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

export const updateEpisode = async(userId, id, updateData) => {
    const episode = await prisma.episode.update({
        where : { userId, id },
        data : updateData
    })

    return findEpisodeById(userId, id);
};

export const deleteEpisodeById = async(userId, id) => {
    const episode = await prisma.episode.findFirst({
        where : { id : Number(id), userId}
    });

    if (!episode) {
        throw new Error("존재하지 않거나 권한이 없습니다.");
    }

    await prisma.episode.delete({
        where : { id : Number(id) }
    });

    return true;
};

export const createQuestion = async(userId, episodeId, question) => {
    return await prisma.$transaction(async (tx) => {

        const newQuestion = await tx.questionTemplate.create({
            data: { userId, question }
        });

        await tx.episodeAnswer.create({
            data: {
                episodeId: Number(episodeId),
                questionId: newQuestion.id,
                answer: ""
            }
        });

        return {
            id: Number(newQuestion.id),
            question : newQuestion.question
        };
    });
};

export const updateQuestionAnswer = async(userId, episodeId, questionId, answerText) => {
    const answer = await prisma.episodeAnswer.findFirst({
        where: {
            episodeId: Number(episodeId),
            questionId: Number(questionId),
            episode: {
                userId
            }
        }
    });

    if (!answer) {
        throw new Error("답변 없음 또는 권한이 없습니다.");
    }

    const update = await prisma.episodeAnswer.update({
        where : {id : answer.id},
        data : {
            answer : answerText
        },
        include : {
            question : true
        }
    });

    return {
        answerId : Number(update.id),
        question : update.question.question,
        answer : update.answer
    }
};

export const deleteQuestionById = async(userId, id) => {
    const question = await prisma.questionTemplate.findFirst({
        where: {
            id: Number(id),
            userId
        }
    });

    if (!question) {
        throw new Error("질문 없음 또는 권한이 없습니다.");
    }

    if (question.userId === null) {
        throw new Error("공용 질문은 삭제할 수 없습니다.");
    }

    // 질문 삭제
    await prisma.questionTemplate.delete({
        where: {
            id: Number(id)
        }
    });

    return true;
};