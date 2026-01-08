import DiaryEntry from "../Models/DiaryEntry.js";
import mongoose from "mongoose";

export const updatePost = async(req, res) => {
    try{

        const { title, content, mood } = req.body;
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid entry ID",
            });
        }
        const entry = await DiaryEntry.findOne({
            _id: id,
            user: req.session.userID,
            isDeleted: false,
        })

        if (!entry) {
            return res.status(404).json({
                success: false,
                message: "Diary entry not found",
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
        });
        
    }catch(err){
        console.error("Update diary error:", err);
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
}