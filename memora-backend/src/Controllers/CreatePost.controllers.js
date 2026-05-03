import DiaryEntry from "../Models/DiaryEntry.js";
import { analyseMood } from "../Utils/AnalyseMood.js";
import { updateDailyMood } from "../Utils/UpdateDailyMood.js";
import { generateReflection } from "../Utils/GenerateReflection.js";
import { reflectionTemplates } from "../Utils/ReflectionTemplates.js";

export const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title.trim() || !content.trim()) {
      return res.status(400).json({
        success: false,
        message: "Diary entry incomplete",
      });
    }

    const { mood, score } = analyseMood(title, content);

    let reflection;
    let generatedBy;

    // ✅ Only call AI if mood is sad or anxious
    if ((mood === "sad" || mood === "anxious") && content.length > 50) {
      try {
        reflection = await generateReflection(title, content, mood);
        generatedBy = "llm";
      } catch (err) {
        console.error("LLM generation failed:", err.message);
        // fallback to template if AI fails
        reflection =
          reflectionTemplates[
            Math.floor(Math.random() * reflectionTemplates.length)
          ];
        generatedBy = "template";
      }
    } else {
      // not sad/anxious → use a random template
      reflection =
        reflectionTemplates[
          Math.floor(Math.random() * reflectionTemplates.length)
        ];
      generatedBy = "template";
    }

    const entry = new DiaryEntry({
      user: req.session.userID,
      title: title.trim(),
      content: content.trim(),
      mood,
      score,
      reflection: {
        heading: reflection.heading,
        body: reflection.body,
        cbt: reflection.cbt || "",
        generatedBy,
      },
    });

    await entry.save();

    await updateDailyMood(score, req.session.userID, req.session.timezone);

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