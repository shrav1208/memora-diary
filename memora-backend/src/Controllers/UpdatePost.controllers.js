import DiaryEntry from "../Models/DiaryEntry.js";

export const updatePost = async(req, res) => {
    try {
        const { title, content, mood } = req.body;

        const entry = await DiaryEntry.findById(req.params.id);

        if (!entry || entry.isDeleted) {
            return res.status(404).json({
                success: false,
                message: "Diary entry not found",
            });
        }

        if (entry.user.toString() !== req.user.userId) {
            return res.status(403).json({
                success: false,
                message: "Access denied",
            });
        }

        if (content !== undefined && !content.trim()) {
            return res.status(400).json({
                success: false,
                message: "Diary content cannot be empty",
            });
        }

        if (title !== undefined) entry.title = title.trim();
        if (content !== undefined) entry.content = content.trim();
        if (mood !== undefined) entry.mood = mood;

        await entry.save();

        return res.status(200).json({
            success: true,
            message: "Diary entry updated",
            entry,
        });
    } catch (err) {
        console.error("Update diary error:", err);
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
}