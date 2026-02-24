import DiaryEntry from "../Models/DiaryEntry.js";

export const getTodayReflection = async (req, res) => {
    try {
        const userId = req.session.userID;

        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

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