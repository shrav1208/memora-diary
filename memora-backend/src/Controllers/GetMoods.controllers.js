import DailyMood from "../Models/DailyMood.js";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone.js";
import utc from "dayjs/plugin/utc.js";
import mongoose from "mongoose";

dayjs.extend(utc);
dayjs.extend(timezone);

export const getMoods = async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.session.userID);

        const tz = req.session.timezone || "UTC"; //enter preferred timzone for testing if using postman

        // console.log("timezone: " + req.session.timezone);

        const now = dayjs().tz(tz);

        const startDate = now.clone().startOf("month").utc().toDate();
        const today = now.clone().startOf("day").utc().toDate();

        // console.log(startDate.toISOString() + " " + today.toISOString());

        const moods = await DailyMood.find({
            user: userId,
            date: { $gte: startDate, $lte: today },
        });

        // console.log(moods);

        const result = moods.map(({ date, mood, score, entries }) => ({
            date, mood, score, entries,
        }));

        res.status(200).json({
            success: true,
            result,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false });
    }
};
