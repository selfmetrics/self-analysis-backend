import { aggregateEmotionStats } from "../repositories/analyticsRepository.js";

export const getEmotionAnalyticsService = async(userId, startDate, endDate) => {
    return aggregateEmotionStats(userId, startDate, endDate);
};