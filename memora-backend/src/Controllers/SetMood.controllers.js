import DailyMood from "../Models/DailyMood.js";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone.js";
import utc from "dayjs/plugin/utc.js";
import mongoose from "mongoose";

dayjs.extend(utc);
dayjs.extend(timezone);

function calculateScore(mood){
    if (mood === "sad") return -4;
    if (mood === "anxious") return -1;
    if (mood === "neutral") return 0;
    if (mood === "calm") return 4;
    if (mood === "happy") return 8;
    else return 9;
}

export const setMood = async (req, res) => {
    const { mood } = req.body;

    const userId = new mongoose.Types.ObjectId(req.session.userID);
    
    const tz = req.session.timezone || "UTC";

    const today = dayjs().tz(tz).startOf("day").utc().toDate();

    DailyMood.create({
        user: userId,
        date: today,
        mood,
        score: calculateScore(mood),
        entries: 0,
        source: "manual",
    })
}