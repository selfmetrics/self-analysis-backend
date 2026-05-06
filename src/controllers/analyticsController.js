import { getEmotionAnalyticsService } from "../services/analyticsService.js";
import { success } from "../utils/responses.js";

export const getEmotions = async(req, res, next) => {
    try {
        const result = await getEmotionAnalyticsService(req.userId, req.query.startDate, req.query.endDate);
    
        return success(res, result, "기간 간 감정 조회에 성공하였습니다.");
    } catch (err) {
        next(err);
    }
};