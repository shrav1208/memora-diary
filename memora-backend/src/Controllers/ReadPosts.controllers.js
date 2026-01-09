import DiaryEntry from "../Models/DiaryEntry.js";
import mongoose from "mongoose";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";

dayjs.extend(utc);

export const readPosts = async (req, res) => {
    try {
        const { year, month, day } = req.query;

        if (
            year === undefined ||
            month === undefined ||
            day === undefined
        ) {
            return res.status(400).json({
                success: false,
                message: "Year, month and day are required",
            });
        }

        const userId = new mongoose.Types.ObjectId(req.session.userID);

        // month is 0-based (Jan = 0) — same as dayjs
        const startOfDay = new Date(
            Number(year),
            Number(month),     // 0-based (Jan = 0)
            Number(day),
            0, 0, 0, 0
        );

        const endOfDay = new Date(
            Number(year),
            Number(month),
            Number(day),
            23, 59, 59, 999
        );

        console.log("QUERY RANGE:", startOfDay, endOfDay);

        const entries = await DiaryEntry.find({
            user: userId,
            isDeleted: false,
            createdAt: {
                $gte: startOfDay,
                $lte: endOfDay,
            },
        }).sort({ createdAt: 1 });

        console.log(entries);

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