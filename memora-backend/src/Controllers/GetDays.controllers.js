import DiaryEntry from "../Models/DiaryEntry.js";
import mongoose from "mongoose";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";

dayjs.extend(utc);
dayjs.extend(timezone);

export const getDays = async (req, res) => {
try {

    if (!req.session.userID) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized",
        });
    }

    const { year, month } = req.query;

    // Convert to numbers
    const y = parseInt(year);
    const m = parseInt(month);

    if (!year || !month) {
        return res.status(400).json({
            success: false,
            message: "year and month are required",
        });
    }

    if (isNaN(y) || isNaN(m)) {
        return res.status(400).json({
            success: false,
            message: "Valid year and month query parameters are required",
        });
    }

    const currentYear = new Date().getFullYear();

    if (y < 1970 || y > currentYear) {
        return res.status(400).json({
            success: false,
            message: "Year out of range",
        });
    }

    if (m < 0 || m > 11) {
        return res.status(400).json({
            success: false,
            message: "Month must be between 0 and 11",
        });
    }

    const userId = new mongoose.Types.ObjectId(req.session.userID);

    const tz = req.session.timezone || "UTC";

    // console.log(tz);

    const startDate = dayjs
    .tz(`${y}-${m + 1}-1`, tz)
    .startOf("month")
    .utc()
    .toDate();

    // console.log(startDate);

    const endDate = dayjs
    .tz(`${y}-${m + 1}-1`, tz)
    .endOf("month")
    .utc()
    .toDate();

    const days = await DiaryEntry.aggregate([
    {
        $match: {
            user: userId,
            isDeleted: false,
            createdAt: {
                $gte: startDate,
                $lte: endDate,
            },
        }
    },
    {
        $group: {
        _id: { 
            $dayOfMonth: {
                date: "$createdAt",
                timezone: tz,
            },
        },
        count: { $sum: 1 },
        }
    },
    {
        $project: {
        _id: 0,
        day: "$_id",
        count: 1
        }
    },
    {
        $sort: { day: 1 } 
    }
    ]);

    res.status(200).json({
    success: true,
    days,
    });
} catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
}
};
