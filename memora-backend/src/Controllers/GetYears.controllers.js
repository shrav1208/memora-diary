import DiaryEntry from "../Models/DiaryEntry.js";
import mongoose from "mongoose";

export const getYears = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.session.userID);

    const years = await DiaryEntry.aggregate([
      {
        $match: { user: userId } // IMPORTANT: user-specific
      },
      {
        $group: {
          _id: { $year: "$createdAt" },
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
