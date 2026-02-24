import Sentiment from "sentiment";

const sentiment  = new Sentiment();

function stripHtml(html) {
    return html.replace(/<[^>]*>/g, " ");
}

export const analyseMood = (title, content) => {
    const cleanTitle = stripHtml(title || "");
    const cleanContent = stripHtml(content || "");
    const text = `${cleanTitle}. ${cleanContent}`;


    const { score } = sentiment.analyze(text);

    if (score <= -6) return {mood: "sad", score};
    if (score <= -3) return {mood: "anxious", score};
    if (score <= 0) return {mood: "neutral", score};
    if (score <= 3) return {mood: "calm", score};
    if (score <= 6) return {mood: "happy", score};
    return {mood: "excited", score};
}