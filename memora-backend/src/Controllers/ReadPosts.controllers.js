import DiaryEntry from "../Models/DiaryEntry.js";
import mongoose from "mongoose";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";

dayjs.extend(utc);

export const readPosts = async (req, res) => {
    try {
        const { year, month, day } = req.query;

        if (year === undefined || month === undefined || day === undefined) {
            return res.status(400).json({
                success: false,
                message: "Year, month and day are required",
            });
        }

        const userId = new mongoose.Types.ObjectId(req.session.userID);

        // month is 0-based (Jan = 0)
        const startOfDay = dayjs
            .utc()
            .year(Number(year))
            .month(Number(month))
            .date(Number(day))
            .startOf("day")
            .toDate();

        const endOfDay = dayjs
            .utc()
            .year(Number(year))
            .month(Number(month))
            .date(Number(day))
            .endOf("day")
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