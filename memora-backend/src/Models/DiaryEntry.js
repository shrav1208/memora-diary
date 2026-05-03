import mongoose from "mongoose";

const diaryEntrySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    },

    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100,
    },

    content: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50000,
    },

    mood: {
        type: String,
        enum: ["happy", "sad", "anxious", "calm", "excited", "neutral"],
        default: "neutral",
        required: true,
    },

    score: {
        type: Number,
        // required: true, (uncomment later)
        min: -100,
        max: 100,
    },

    reflection: {
        heading: String,
        body: String,
        cbt: String, // Added for Cognitive Behavioral Therapy exercises
        generatedBy: {
            type: String,
            enum: ['template', 'llm'],
        },
    },

    isDeleted: {
        type: Boolean,
        default: false,
    },
},
    { timestamps: true },
);

const DiaryEntry = mongoose.model("DiaryEntry", diaryEntrySchema, "diaryEntries");
export default DiaryEntry;