import DiaryEntry from "../Models/DiaryEntry.js";
import mongoose from "mongoose";

export const getDays = async (req, res) => {
try {

    if (!req.session.userID) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized",
        });
    }

    const { year, month } = req.query;

    if (!year || !month) {
        return res.status(400).json({
            success: false,
            message: "year and month are required",
        });
    }

    // Convert to numbers
    const y = parseInt(year);
    const m = parseInt(month);

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

    const startDate = new Date(y, m, 1);
    const endDate = new Date(y, m+1, 1);

    const days = await DiaryEntry.aggregate([
    {
        $match: {
            user: userId,
            isDeleted: false,
            createdAt: {
                $gte: startDate,
                $lt: endDate,
            },
        }
    },
    {
        $group: {
        _id: { $dayOfMonth: "$createdAt" },
        count: { $sum: 1 }
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
