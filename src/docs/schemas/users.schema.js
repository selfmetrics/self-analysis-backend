export const userSchemas = {
    // 마이페이지 응답
    UserResponse: {
        type: "object",
        properties: {
        id: {
            type: "integer",
            example: 1,
        },
        nickname: {
            type: "string",
            example: "맑해",
        },
        email: {
            type: "string",
            example: "user@example.com",
        },
        },
    },

    // 닉네임 수정 요청
    UpdateNicknameRequest: {
        type: "object",
        required: ["nickname"],
        properties: {
        nickname: {
            type: "string",
            example: "새닉네임",
        },
        },
    },
};