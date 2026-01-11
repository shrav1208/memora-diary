import DiaryEntry from "../Models/DiaryEntry.js";
import mongoose from "mongoose";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";

dayjs.extend(utc);
dayjs.extend(timezone);

export const readPosts = async (req, res) => {
    try {
        const { year, month, day } = req.query;

        if (year === undefined || month === undefined || day === undefined) {
            return res.status(400).json({
                success: false,
                message: "Year, month and day are required",
            });
        }

        const y = Number(year);
        const m = Number(month);
        const d = Number(day);

        if (
        isNaN(y) ||
        isNaN(m) ||
        isNaN(d) ||
        m < 0 ||
        m > 11 ||
        d < 1 ||
        d > 31
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid date values",
            });
        }

        const userId = new mongoose.Types.ObjectId(req.session.userID);

        const tz = req.session.timezone || "UTC";

        // month is 0-based (Jan = 0)
        const startOfDay = dayjs
            .tz(`${y}-${m + 1}-${d}`, tz)
            .startOf("day")
            .utc()
            .toDate();

        const endOfDay = dayjs
            .tz(`${y}-${m + 1}-${d}`, tz)
            .endOf("day")
            .utc()
            .toDate();

        const entries = await DiaryEntry.find({
            user: userId,
            isDeleted: false,
            createdAt: {
                $gte: startOfDay,
                $lte: endOfDay,
            },
        }).sort({ createdAt: 1 });

        return res.status(200).json({
            success: true,
            entries,
        });

    } catch (err) {
        console.error("Get diary entries by day error:", err);
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};