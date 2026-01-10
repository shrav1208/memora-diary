import DiaryEntry from "../Models/DiaryEntry.js";
import mongoose from "mongoose";

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

    const months = await DiaryEntry.aggregate([
    {
        $match: {
            user: userId,
            $expr: {
                $eq: [{ $year: "$createdAt" }, year]
            }
        }
    },
    {
        $group: {
        _id: { $subtract: [{ $month: "$createdAt" }, 1] },
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
