import DiaryEntry from "../Models/DiaryEntry.js";
import mongoose from "mongoose";

export const getPost = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({
            success: false,
            message: "Invalid ID",
        });
    }

    try{
        const result = await DiaryEntry.findOne({
            _id: id,
            user: req.session.userID,
            isDeleted: false,
        })

        if (!result) {
            return res.status(404).json({
                success: false,
                message: "Diary entry not found",
            });
        }

        return res.status(200).json({
            success: true,
            title: result.title,
            content: result.content,
        });

    }catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
}