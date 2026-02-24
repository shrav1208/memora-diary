import DailyMood from "../Models/DailyMood.js";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";

dayjs.extend(utc);
dayjs.extend(timezone);

export const getDailyMood = async (req, res) => {
  try {
    const { year, month, day } = req.query;
    const userID = req.user.id; // because you're using requireAuth

    if (!year || month === undefined || !day) {
      return res.status(400).json({ message: "Missing date params" });
    }

    // ⚠ month coming from frontend is 0-based (because dayjs.month())
    const selectedDate = dayjs(
      new Date(year, month, day)
    )
      .startOf("day")
      .utc()
      .toDate();

    const doc = await DailyMood.findOne({
      user: userID,
      date: selectedDate,
    });

    if (!doc) {
      return res.json({ mood: null });
    }

    return res.json({
      mood: doc.entriesMood,
      score: doc.entriesScore,
    });

  } catch (error) {
    console.error("Get mood error:", error);
    res.status(500).json({ message: "Server error" });
  }
};