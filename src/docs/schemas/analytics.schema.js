export const analyticsSchemas = {
  EmotionAnalyticsItem: {
    type: "object",
    properties: {
      date: {
        type: "string",
        format: "date",
        example: "2026-03-01",
      },
      emotion: {
        type: "string",
        example: "happy",
      },
      value: {
        type: "integer",
        minimum: 1,
        maximum: 10,
        example: 7,
      },
    },
  },

  EmotionAnalyticsResponse: {
    type: "array",
    items: {
      $ref: "#/components/schemas/EmotionAnalyticsItem",
    },
  },
};