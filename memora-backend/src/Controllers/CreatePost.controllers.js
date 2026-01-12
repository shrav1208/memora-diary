import DiaryEntry from "../Models/DiaryEntry.js";
import { analyseMood } from "../Utils/AnalyseMood.js";
import { updateDailyMood } from "../Utils/UpdateDailyMood.js";

export const createPost = async(req, res) => {
    try {
        const { title, content } = req.body;

        if (!title.trim() || !content.trim()) {
            return res.status(400).json({
                success: false,
                message: "Diary entry incomplete",
            });
        }

        const {mood, score} = analyseMood (title, content);
        // console.log(mood);

        const entry = new DiaryEntry({
            user: req.session.userID,
            title: title.trim(),
            content: content.trim(),
            mood,
        });

        await entry.save();

        await updateDailyMood (mood, score, req.session.userID);

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