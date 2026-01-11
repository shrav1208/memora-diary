import DiaryEntry from "../Models/DiaryEntry.js";
import mongoose from "mongoose";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";

dayjs.extend(utc);
dayjs.extend(timezone);

export const getYears = async (req, res) => {
  try {

    if (!req.session.userID) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized",
        });
    }

    const userId = new mongoose.Types.ObjectId(req.session.userID);

    const tz = req.session.timezone || "UTC";

    const years = await DiaryEntry.aggregate([
      {
        $match: { user: userId, isDeleted: false } // IMPORTANT: user-specific
      },
      {
        $group: {
          _id: { $year: {date: "$createdAt", timezone: tz} },
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          year: "$_id",
          count: 1
        }
      },
      {
        $sort: { year: 1 } 
      }
    ]);

    res.status(200).json({
      success: true,
      years
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
};
