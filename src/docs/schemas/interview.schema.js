export const interviewSchemas = {
  // 면접 질문 기본 구조
  InterviewQuestion: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        example: 1,
      },
      question: {
        type: "string",
        example: "자기소개",
      },
      answer: {
        type: "string",
        example: "안녕하십니까. 저는 에너지가 넘치는 다나카하루나입니다...",
      },
      createdAt: {
        type: "string",
        format: "date-time",
        example: "2026-04-22T12:00:00Z",
      },
    },
  },

  // 질문 생성 요청
  CreateInterviewQuestionRequest: {
    type: "object",
    required: ["question"],
    properties: {
      question: {
        type: "string",
        example: "인생이란 무엇이며 우리는 왜 사는걸까요?",
      },
    },
  },

  // 질문 수정 요청
  UpdateInterviewQuestionRequest: {
    type: "object",
    properties: {
      question: {
        type: "string",
        example: "RESTful API의 특징은 무엇인가요?",
      },
      answer: {
        type: "string",
        example: "Stateless, Resource 기반 설계 등",
      },
    },
  },

  // 리스트 응답
  InterviewQuestionListResponse: {
    type: "array",
    items: {
      $ref: "#/components/schemas/InterviewQuestion",
    },
  },
};