import prisma from "../lib/prisma.js";

export const createInterviewQuestion = async(userId, question) => {
    return await prisma.$transaction(async (tx) => {
        const answer = await tx.interviewQuestionTemplate.create({
            data: { userId, question }
        });

        const newAnswer = await tx.interviewAnswer.create({
            data: {
                userId,
                questionId: answer.id,
                answer: ""
            }
        });

        return {
            questionId : Number(answer.id),
            question : answer.question,
            answer : newAnswer.answer
        }
    });
};

export const findInterviewQuestions = async(userId) => {
    return await prisma.$transaction(async (tx) => {

        // 유저의 답변 조회
        const existingAnswers = await tx.interviewAnswer.findMany({
            where : { userId },
            select : { questionId : true}
        });
        // ID 배열 생성 
        const answeredIds = existingAnswers.map(ans => ans.questionId);

        // 답변하지 않은 질문 조회
        const interview = await tx.interviewQuestionTemplate.findMany({
            where: {
                OR: [
                    { userId: null },
                    { userId }
                ],
                id : { notIn : answeredIds }
            }
        });

        // 답변하지 않은 경우 빈 값 생성
        if (interview.length > 0) {
            await tx.interviewAnswer.createMany({
                data : interview.map(i => ({
                    userId,
                    questionId : i.id,
                    answer : ""
                }))
            });
        }

        // 전체 질문 목록 반환
        const allAnswer = await tx.interviewQuestionTemplate.findMany({
            where : {
                OR : [{ userId : null }, { userId }]
            }
        });

        return allAnswer.map(q => ({
            questionId : Number(q.id),
            question : q.question
        }))
    });
};

export const findInterviewQuestionById = async(userId, questionId) => {
    const interview = await prisma.interviewAnswer.findFirst({
        where : { userId, questionId }, 
        include : {
            question: true  
        }
    });

    return {
        questionId : Number(interview.questionId),
        answerId : Number(interview.id),
        question : interview.question.question,
        answer : interview.answer 
    }
};

export const updateInterviewQuestion = async(userId, questionId, question, answer) => {
    const existing = await prisma.interviewAnswer.findFirst({
        where: {
            userId,
            questionId: BigInt(questionId)
        }
    });

    const interview = await prisma.interviewAnswer.update({
        where : { id : existing.id },
        data : { answer },
        include : {
            question : true
        }
    });
    
    return {
        answerId : Number(interview.id),
        question : interview.question.question,
        answer : interview.answer
    }
};

export const deleteInterviewQuestionById = async(userId, questionId) => {
    const deleted = await prisma.interviewQuestionTemplate.deleteMany({
        where: {
            id: BigInt(questionId),
            userId
        }
    });

    if (deleted.count === 0) {
        throw new Error("해당하는 질문이 없거나 권한이 없습니다.");
    }

    return true;
};