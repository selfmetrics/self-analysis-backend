export const authSchemas = {
    AuthResponse: {
        type: "object",
        properties: {
            accessToken: {
                type: "string",
                example: "jwt_token_example",
            },
            user: {
                $ref: "#/components/schemas/User"
            }
        },
    },

    User: {
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
        },
    },

    MessageResponse: {
        type: "object",
        properties: {
            message: {
                type: "string",
                example: "성공",
            },
        },
    },
};