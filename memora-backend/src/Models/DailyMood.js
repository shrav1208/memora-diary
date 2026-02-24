import mongoose from "mongoose";

const moodEnum = ["happy", "sad", "anxious", "calm", "excited", "neutral"];

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

    // --- Derived from diary entries ---
    entriesMood: { type: String, enum: moodEnum, default: null },
    entriesScore: { type: Number, default: null },
    entriesCount: { type: Number, default: 0 },

    // --- Set explicitly by the user ---
    manualMood: { type: String, enum: moodEnum, default: null },
    manualScore: { type: Number, default: null },

    // --- Resolved display value (manual ?? entries) ---
    mood: { type: String, enum: moodEnum, default: null },
    score: { type: Number, default: null },
},
    { timestamps: true }
);

DailyMoodSchema.index({ user: 1, date: 1 }, { unique: true });

// Helper: re-derive the display value
DailyMoodSchema.methods.resolveDisplay = function () {
    if (this.manualMood !== null) {
        this.mood = this.manualMood;
        this.score = this.manualScore;
    } else if (this.entriesMood !== null) {
        this.mood = this.entriesMood;
        this.score = this.entriesScore;
    } else {
        this.mood = null;
        this.score = null;
    }
};

const DailyMood = mongoose.model("DailyMood", DailyMoodSchema, "dailyMood");
export default DailyMood;