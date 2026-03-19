import DiaryEntry from "../Models/DiaryEntry.js";
import mongoose from "mongoose";
import { analyseMood } from "../Utils/AnalyseMood.js";
import { updateDailyMoodUpdate } from "../Utils/UpdateDailyMoodUpdate.js";
import { generateReflection } from "../Utils/GenerateReflection.js";
import { reflectionTemplates } from "../Utils/ReflectionTemplates.js";

export const updatePost = async (req, res) => {
    try {

        const { title, content } = req.body;
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

        const { mood, score } = analyseMood(entry.title, entry.content);

        let reflection;
        let generatedBy;

        const shouldCallLLM =
            (mood === "sad" || Math.abs(score) > 0.8) &&
            entry.content.length > 50;

        if (shouldCallLLM) {
            try {
                reflection = await generateReflection(entry.title, entry.content, mood);
                generatedBy = "llm";
            } catch (llmErr) {
                console.error("Gemini failed, falling back to template:", llmErr);
                reflection = reflectionTemplates[
                    Math.floor(Math.random() * reflectionTemplates.length)
                ];
                generatedBy = "template";
            }
        } else {
            reflection = reflectionTemplates[
                Math.floor(Math.random() * reflectionTemplates.length)
            ];
            generatedBy = "template";
        }

        entry.reflection = {
            heading: reflection.heading,
            body: reflection.body,
            generatedBy,
        };

        const prevscore = entry.score;

        entry.mood = mood;
        entry.score = score;

        await entry.save();

        await updateDailyMoodUpdate(score, prevscore, req.session.userID, req.session.timezone, entry.createdAt);

        return res.status(200).json({
            success: true,
            message: "Diary entry updated",
        });

    } catch (err) {
        console.error("Update diary error:", err);
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
}