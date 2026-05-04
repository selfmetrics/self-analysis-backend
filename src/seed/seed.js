import prisma from "../lib/prisma.js";

// npx prisma db seed
// 에피소드 질문
const episodeQuestions = [
    { question: "그 날 가장 인상 깊었던 일은 무엇인가요?" },
    { question: "그 상황에서 당신의 역할은 무엇이었나요?" },
    { question: "어떤 문제를 겪었고, 어떻게 해결했나요?" },
    { question: "그 경험에서 배운 점은 무엇인가요?" },
    { question: "당시 감정은 어땠고, 왜 그렇게 느꼈나요?" },
    { question: "다시 그 상황이 온다면 어떻게 다르게 행동할 건가요?" },
    { question: "이 경험이 당신에게 어떤 영향을 주었나요?" },
    { question: "주변 사람들과의 관계는 어땠나요?" },
    { question: "가장 어려웠던 순간은 언제였나요?" },
    { question: "그 일을 통해 성장했다고 느낀 부분은 무엇인가요?" }
];

// 면접 질문
const interviewQuestions = [
    { question: "자기소개를 해주세요." },
    { question: "우리 회사에 지원한 이유는 무엇인가요?" },
    { question: "본인의 강점과 약점은 무엇인가요?" },
    { question: "협업 중 갈등을 해결한 경험을 말해보세요." },
    { question: "가장 어려웠던 프로젝트 경험은 무엇인가요?" },
    { question: "실패 경험과 그것을 극복한 방법을 말해주세요." },
    { question: "리더십을 발휘했던 경험이 있나요?" },
    { question: "앞으로의 커리어 목표는 무엇인가요?" },
    { question: "스트레스를 어떻게 관리하나요?" },
    { question: "왜 우리가 당신을 채용해야 하나요?" }
];

async function main() {
    // 기존 데이터 삭제
    await prisma.$executeRaw`TRUNCATE TABLE "QuestionTemplate" RESTART IDENTITY CASCADE;`;
    await prisma.$executeRaw`TRUNCATE TABLE "InterviewQuestionTemplate" RESTART IDENTITY CASCADE;`;

    // 데이터 저장
    await prisma.QuestionTemplate.createMany({
        data : episodeQuestions
    });

    await prisma.InterviewQuestionTemplate.createMany({
        data : interviewQuestions
    });
}

main()
    .then(() => {
        console.log("Seeding 완료");
        prisma.$disconnect();
    })
    .catch((e) => {
        console.error(e);
        prisma.$disconnect();
        process.exit(1);
    });