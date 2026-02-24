import DailyMood from "../Models/DailyMood.js";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone.js";
import utc from "dayjs/plugin/utc.js";
import mongoose from "mongoose";

dayjs.extend(utc);
dayjs.extend(timezone);

const moodScores = {
    sad: -6,
    anxious: -3,
    neutral: 0,
    calm: 3,
    happy: 6,
    excited: 9,
};

export const setMood = async (req, res) => {
    try {
        const { mood, date } = req.body;

        if (!moodScores.hasOwnProperty(mood)) {
            return res.status(400).json({ success: false, message: "Invalid mood" });
        }

        if (!date) {
            return res.status(400).json({ success: false, message: "Date required" });
        }

        const userId = new mongoose.Types.ObjectId(req.session.userID);
        const tz = req.session.timezone || "UTC";

        // 🔥 Normalize SELECTED date, not today
        const selectedDate = dayjs(date)
            .tz(tz)
            .startOf("day")
            .utc()
            .toDate();

        const doc = await DailyMood.findOneAndUpdate(
            { user: userId, date: selectedDate },
            { $setOnInsert: { user: userId, date: selectedDate } },
            { upsert: true, new: true }
        );

        doc.manualMood = mood;
        doc.manualScore = moodScores[mood];

        doc.resolveDisplay();
        await doc.save();

        return res.status(200).json({ success: true });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false });
    }
};

// Optional: clear manual mood and fall back to entries
export const clearManualMood = async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.session.userID);
        const tz = req.session.timezone || "UTC";
        const { date } = req.body;

        const selectedDate = dayjs(date)
            .tz(tz)
            .startOf("day")
            .utc()
            .toDate();

        const doc = await DailyMood.findOne({ user: userId, date: selectedDate });
        if (!doc) return res.status(200).json({ success: true });

        doc.manualMood = null;
        doc.manualScore = null;
        doc.resolveDisplay();

        if (doc.mood === null) {
            await doc.deleteOne();
        } else {
            await doc.save();
        }

        return res.status(200).json({ success: true });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false });
    }
};