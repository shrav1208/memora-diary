import DiaryEntry from "../Models/DiaryEntry.js";
import { updateDailyMoodDelete } from "../Utils/UpdateDailyMoodDelete.js";

export const deletePost = async (req, res) => {
    try {
        console.log("DELETE PARAM ID:", req.params.id);
        console.log("SESSION USER:", req.session.userID);

        const entry = await DiaryEntry.findById(req.params.id);
        // console.log("ENTRY FOUND:", entry);

        if (!entry || entry.isDeleted) {
            return res.status(404).json({
                success: false,
                message: "Diary entry not found",
            });
        }

        // console.log("ENTRY USER:", entry.user.toString());

        if (entry.user.toString() !== req.session.userID) {
            // console.log("❌ USER MISMATCH");
            return res.status(403).json({
                success: false,
                message: "Access denied",
            });
        }

        entry.isDeleted = true;
        await entry.save();

        await updateDailyMoodDelete(entry.score, req.session.userID, req.session.timezone, entry.createdAt);

        // console.log("✅ ENTRY DELETED");
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
