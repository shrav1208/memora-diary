import DiaryEntry from "../Models/DiaryEntry.js";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone.js";
import utc from "dayjs/plugin/utc.js";

dayjs.extend(utc);
dayjs.extend(timezone);

export const getTodayReflection = async (req, res) => {
    try {
        const userId = req.session.userID;
        const tz = req.session.timezone || "UTC";

        const startOfDay = dayjs().tz(tz).startOf("day").utc().toDate();
        const endOfDay = dayjs().tz(tz).endOf("day").utc().toDate();

        // Get latest entry today
        const entry = await DiaryEntry.findOne({
            user: userId,
            isDeleted: false,
            createdAt: { $gte: startOfDay, $lte: endOfDay }
        }).sort({ createdAt: -1 });

        if (!entry) {
            return res.json({
                reflection: {
                    heading: "Keep Moving Forward",
                    body: "Every day is a new opportunity to grow. Small progress still counts."
                }
            });
        }

        return res.json({
            reflection: {
                heading: entry.reflection.heading,
                body: entry.reflection.body
            }
        });

    } catch (err) {
        console.error("Get reflection error:", err);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};