import Sentiment from 'sentiment';

const sentiment = new Sentiment();

export function analyzeMood(text) {
  const result = sentiment.analyze(text);
  const comparative = result.comparative;

  let mood = 'neutral';

  if (comparative > 0.5) mood = 'happy';
  else if (comparative < -0.5) mood = 'sad';

  return {
    mood,
    score: comparative,
    isStrongPolarity: Math.abs(comparative) > 0.8,
  };
}