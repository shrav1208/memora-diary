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

export const updateDailyMoodDelete = async (score, userID, tz = "UTC", entryDate) => {
    try {
        const date = dayjs(entryDate).tz(tz).startOf("day").utc().toDate();

        const doc = await DailyMood.findOne({ user: userID, date });
        if (!doc || !doc.entriesCount) return;

        if (doc.entriesCount === 1) {
            // No more entries for this day — clear entries fields
            doc.entriesCount = 0;
            doc.entriesScore = null;
            doc.entriesMood = null;
        } else {
            const prevTotal = doc.entriesScore * doc.entriesCount;
            doc.entriesCount -= 1;
            doc.entriesScore = (prevTotal - score) / doc.entriesCount;
            doc.entriesMood = calculateMood(doc.entriesScore);
        }

        doc.resolveDisplay();

        // If nothing left to show at all, remove the document
        if (doc.mood === null) {
            await doc.deleteOne();
        } else {
            await doc.save();
        }
    } catch (err) {
        console.error("UpdateDailyMoodDelete error:", err);
    }
};