import DailyMood from "../Models/DailyMood.js";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone.js";
import utc from "dayjs/plugin/utc.js";

dayjs.extend(utc);
dayjs.extend(timezone);

function calculateMood(score) {
    if (score <= -6) return "sad";
    if (score <= -3) return "anxious";
    if (score <= 0) return "neutral";
    if (score <= 3) return "calm";
    if (score <= 6) return "happy";
    return "excited";
}

export const updateDailyMoodUpdate = async (newScore, prevScore, userID, tz = "UTC", entryDate) => {
    const date = dayjs(entryDate).tz(tz).startOf("day").utc().toDate();

    const doc = await DailyMood.findOne({ user: userID, date });
    if (!doc || !doc.entriesCount) return;

    const prevTotal = doc.entriesScore * doc.entriesCount;
    doc.entriesScore = (prevTotal - prevScore + newScore) / doc.entriesCount;
    doc.entriesMood = calculateMood(doc.entriesScore);

    doc.resolveDisplay();
    await doc.save();
};