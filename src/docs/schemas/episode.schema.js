export const episodeSchemas = {
  // 리스트용 (가볍게)
  EpisodeSummary: {
    type: "object",
    properties: {
      id: { type: "integer", example: 1 },
      date: { type: "string", format: "date" },
      title: { type: "string", example: "오늘 회고" },
      emotion: { type: "string", enum: ["happy", "sad"] },
      emotionIntensity: { type: "integer", example: 7 },
    },
  },

  // 상세용 (질문 포함)
  EpisodeDetail: {
  type: "object",
  required: ["id", "date", "title", "emotion", "emotionIntensity", "questions"],
  properties: {
    id: { type: "integer" },
    date: { type: "string", format: "date" },
    title: { type: "string" },
    content: { type: "string" },
    emotion: { type: "string", enum: ["happy", "sad"] },
    emotionIntensity: { type: "integer" },
    questions: {
      type: "array",
      items: {
        $ref: "#/components/schemas/EpisodeQuestion",
      },
    },
  },
  },

  // 질문
  EpisodeQuestion: {
    type: "object",
    required: ["id", "question"],
    properties: {
      id: { type: "integer" },
      question: { type: "string" },
      answer: { type: "string" },
    },
  },

  // 생성
  CreateEpisodeRequest: {
  type: "object",
  properties: {
    type: {
      type: "string",
      example: "default",
      description: "질문 타입 (추후 확장용)",
    },
  },
  },

  // 질문 답변
  InitialQuestionsResponse: {
  type: "object",
  properties: {
    questions: {
      type: "array",
      items: {
        $ref: "#/components/schemas/EpisodeQuestion",
      },
    },
  },
  },

  // 에피소드 저장
  CreateEpisodeCompleteRequest: {
  type: "object",
  required: ["date", "title", "emotion", "emotionIntensity", "answers"],
  properties: {
    date: { type: "string", format: "date" },
    title: { type: "string" },
    content: { type: "string", nullable: true },
    emotion: { type: "string", enum: ["happy", "sad"] },
    emotionIntensity: { type: "integer", minimum: 1, maximum: 10 },

    answers: {
      type: "array",
      items: {
        type: "object",
        required: ["questionId", "answer"],
        properties: {
          questionId: { type: "integer", example: 2 },
          answer: { type: "string", example: "업무가 많았다" },
        },
      },
    },
  },
  },

  // 수정
  UpdateEpisodeRequest: {
    type: "object",
    properties: {
      date: { type: "string", format: "date" },
      title: { type: "string" },
      content: { type: "string" },
      emotion: { type: "string", enum: ["happy", "sad"] },
      emotionIntensity: { type: "integer" },
    },
  },

  // 질문 생성
  CreateQuestionRequest: {
    type: "object",
    required: ["question"],
    properties: {
      question: { type: "string" },
    },
  },

  EpisodeListResponse: {
    type: "array",
    items: {
      $ref: "#/components/schemas/EpisodeSummary",
    },
  },

  UpdateAnswerRequest: {
  type: "object",
  required: ["answer"],
  properties: {
    answer: {
      type: "string",
      example: "그 상황에서 많이 배웠다",
    },
  },
  }
};