import DailyMood from "../Models/DailyMood.js";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone.js";
import utc from "dayjs/plugin/utc.js";

dayjs.extend(utc);
dayjs.extend(timezone);

function calculatedScore(totalScore, entries, score, prevscore){
    return ((totalScore*entries)-prevscore+score)/entries;
}

function calculateMood(score){
    if (score <= -4) return "sad";
    if (score <= -1) return "anxious";
    if (score < 2) return "neutral";
    if (score < 5) return "calm";
    if (score < 9) return "happy";
    return "excited";
}

export const updateDailyMoodUpdate = async (score, prevscore, userID, timezone) => {
    const tz = timezone || "UTC";
    
    const today = dayjs().tz(tz).startOf("day").utc().toDate();

    const dailyMood = await DailyMood.findOne({
        user: userID,
        date: today,
    })

    
    dailyMood.score = calculatedScore(dailyMood.score, dailyMood.entries, score, prevscore);
    dailyMood.mood = calculateMood(dailyMood.score);
    await dailyMood.save();
}