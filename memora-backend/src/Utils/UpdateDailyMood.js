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

export const updateDailyMood = async (score, userID, tz = "UTC") => {
    const today = dayjs().tz(tz).startOf("day").utc().toDate();

    const doc = await DailyMood.findOneAndUpdate(
        { user: userID, date: today },
        { $setOnInsert: { user: userID, date: today } },
        { upsert: true, new: true }
    );

    // Recalculate running average for entries
    const prevTotal = (doc.entriesScore ?? 0) * (doc.entriesCount ?? 0);
    doc.entriesCount = (doc.entriesCount ?? 0) + 1;
    doc.entriesScore = (prevTotal + score) / doc.entriesCount;
    doc.entriesMood = calculateMood(doc.entriesScore);

    doc.resolveDisplay();
    await doc.save();
};