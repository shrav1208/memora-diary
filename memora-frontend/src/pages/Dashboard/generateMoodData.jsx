// generateMoodData.js
import dayjs from "dayjs";

export default function generateMoodData() {
  const daysInMonth = dayjs().daysInMonth();
  const today = dayjs().date();

  const data = Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1;
    return {
        day,                         // X-axis value
      mood: day <= today ? Math.floor(Math.random() * 5) + 1 : null, 
    };
  });

  return data;
}
