import DiaryEntry from "../Models/DiaryEntry.js";

export const create = async(req, res) => {
    try {
        const { title, content, mood } = req.body;

        if (!title.trim() || !content.trim()) {
            return res.status(400).json({
                success: false,
                message: "Diary entry incomplete",
            });
        }

        const entry = new DiaryEntry({
            user: req.session.userID,
            title: title.trim(),
            content: content.trim(),
            mood,
        });

        await entry.save();

        return res.status(201).json({
            success: true,
            message: "Diary entry created",
            entry,
        });
    } catch (err) {
        console.error("Create diary error:", err);
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};