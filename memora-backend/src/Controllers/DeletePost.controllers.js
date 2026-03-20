import DiaryEntry from "../Models/DiaryEntry.js";
import { updateDailyMoodDelete } from "../Utils/UpdateDailyMoodDelete.js";

export const deletePost = async (req, res) => {
    try {
        const entry = await DiaryEntry.findById(req.params.id);

        if (!entry || entry.isDeleted) {
            return res.status(404).json({
                success: false,
                message: "Diary entry not found",
            });
        }

        if (entry.user.toString() !== req.session.userID) {
            return res.status(403).json({
                success: false,
                message: "Access denied",
            });
        }

        entry.isDeleted = true;
        await entry.save();

        await updateDailyMoodDelete(entry.score, req.session.userID,  req.session.timezone, entry.createdAt);

        return res.status(200).json({
            success: true,
            message: "Diary entry deleted",
        });
    } catch (err) {
        console.error("Delete diary error:", err);
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};
