import swaggerJsdoc from "swagger-jsdoc";
import { authSchemas } from "./schemas/auth.schema.js";
import { userSchemas } from "./schemas/users.schema.js";
import { interviewSchemas } from "./schemas/interview.schema.js";
import { episodeSchemas } from "./schemas/episode.schema.js";
import { analyticsSchemas } from "./schemas/analytics.schema.js";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
        title: "자기분석 API",
        version: "1.0.0",
        description: "자기분석 웹 서비스  REST API 정의 문서",
        },
        servers: [
        {
            url: "http://localhost:3000",
        },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
            schemas: {
                ...authSchemas,
                ...userSchemas,
                ...interviewSchemas,
                ...episodeSchemas,
                ...analyticsSchemas,
            }
        },
    },
    apis: ["./src/routes/*.js"], 
};

export const swaggerSpec = swaggerJsdoc(options);