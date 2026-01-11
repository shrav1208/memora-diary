import DiaryEntry from "../Models/DiaryEntry.js";
import mongoose from "mongoose";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";

dayjs.extend(utc);
dayjs.extend(timezone);

export const getMonths = async (req, res) => {
try {

    if (!req.session.userID) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized",
        });
    }

    const year = parseInt(req.query.year);

    if (isNaN(year)) {
        return res.status(400).json({
            success: false,
            message: "Valid year query parameter is required",
        });
    }

    const currentYear = new Date().getFullYear();

    if (year < 1970 || year > currentYear) {
        return res.status(400).json({
            success: false,
            message: "Year out of range",
        });
    }

    const userId = new mongoose.Types.ObjectId(req.session.userID);

    const tz = req.session.timezone || "UTC";

    const months = await DiaryEntry.aggregate([
    {
        $match: {
            user: userId,
            isDeleted: false,
            $expr: {
                $eq: [{ $year: {date: "$createdAt", timezone: tz} }, year]
            }
        }
    },
    {
        $group: {
        _id: { $subtract: [{ $month: {date: "$createdAt", timezone: tz} }, 1] },
        count: { $sum: 1 }
        }
    },
    {
        $project: {
        _id: 0,
        month: "$_id",
        count: 1
        }
    },
    {
        $sort: { month: 1 } 
    }
    ]);

    res.status(200).json({
    success: true,
    months,
    });
} catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
}
};
