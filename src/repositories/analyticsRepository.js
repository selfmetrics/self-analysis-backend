import prisma from "../lib/prisma.js";

export const aggregateEmotionStats = async(userId, startDate, endDate) => {
    const episode = await prisma.episode.findMany({
    where : {
        userId, 
        eventDate : {
            gte : new Date(startDate),
            lte : new Date(endDate)
        }
    },
    orderBy: {
        eventDate: "asc"
    }
    });

    return episode.map(e => ({
        date : e.eventDate.toISOString().split("T")[0],
        emotion : e.emotion,
        value : e.emotionScore
    }));
};