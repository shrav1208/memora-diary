import mongoose from "mongoose";

const DailyMoodSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    },

    date: { 
        type: Date,
        required: true, 
        index: true,
    },

    mood: {
        type: String,
        enum: ["happy", "sad", "anxious", "calm", "excited", "neutral"],
        required: true,
    }, 

    score: {
        type: Number,
        required: true,
    },

    entries: {
        type: Number,
        required: true,
    },

    source: {
        type: String,
        enum: ["entries", "manual"],
        required: true,
    }
},
    { timestamps: true },
);  

DailyMoodSchema.index({ user: 1, date: 1 }, { unique: true });

const DailyMood = mongoose.model("DailyMood", DailyMoodSchema, "dailyMood");
export default DailyMood;