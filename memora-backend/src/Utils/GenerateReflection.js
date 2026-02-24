import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI('AIzaSyDHcRKUNhNP8jhVSUggD-1WR9i1C75gLcM');

export const generateReflection = async (title, content, mood) => {
    try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const combinedText = `${title}. ${content}`;

    const prompt = `
You are a supportive reflection assistant.

Journal entry:
"${combinedText.slice(0, 800)}"

Detected mood: ${mood}

Return JSON with keys:
- heading (short 3-6 word title)
- body (1-2 sentence supportive reflection)

Do not include anything else. Do not give medical advice. Acknowledge feelings but do not mention them, instead only mention supportive reflections based on those feelings.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text().trim();

    // Remove markdown code blocks if Gemini adds them
    if (text.startsWith("```")) {
      text = text.replace(/```json|```/g, "").trim();
    }

    // ✅ Parse JSON to object
    const reflection = JSON.parse(text);

    return reflection;

  } catch (error) {
    console.error("Gemini reflection error:", error.message);
    return "Reflection unavailable.";
  }
};