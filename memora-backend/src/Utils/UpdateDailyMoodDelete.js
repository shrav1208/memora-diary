import DailyMood from "../Models/DailyMood.js";

function calculatedScore(totalScore, entries, score){
    return ((totalScore*entries)-score)/(entries-1);
}

function calculateMood(score){
    if (score <= -4) return "sad";
    if (score <= -1) return "anxious";
    if (score < 2) return "neutral";
    if (score < 5) return "calm";
    if (score < 9) return "happy";
    return "excited";
}

export const updateDailyMoodDelete = async (score, userID) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dailyMood = await DailyMood.findOne({
        user: userID,
        date: today,
    })

    if (dailyMood.entries === 1) {
        await dailyMood.deleteOne();
        return;
    }
    
    dailyMood.score = calculatedScore(dailyMood.score, dailyMood.entries, score);
    dailyMood.mood = calculateMood(dailyMood.score);
    dailyMood.entries -= 1;
    await dailyMood.save();
}