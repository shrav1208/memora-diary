import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    ResponsiveContainer
} from "recharts";
import styles from './MoodTracker.module.css'
import { useEffect, useState } from "react";
import axios from "axios";

const MOOD_SCALE = {
    sad:     1,
    anxious: 2,
    neutral: 3,
    calm:    4,
    happy:   5,
    excited: 6,
};

export const MoodTracker = ({ refreshKey }) => {

    const [moodData, setMoodData] = useState([]);

    useEffect(() => {
        (async () => {
            const res = await axios.get('/api/get/moods');
            const result = res.data.result.map(({ date, mood }) => ({
                day: new Date(date).getDate(),
                mood: MOOD_SCALE[mood] ?? null,   // normalise to 1–5
            }));

            const moodMap = new Map(result.map(item => [item.day, item.mood]));

            const fullMonth = Array.from({ length: 31 }, (_, i) => {
                const day = i + 1;
                return {
                    day,
                    mood: moodMap.has(day) ? moodMap.get(day) : null,
                };
            });

            setMoodData(fullMonth);
        })();
    }, [refreshKey]); // re-fetches whenever refreshKey changes

    return (
        <div className={styles['mood-card']}>
            <p className={styles['mood-heading']}>Mood Tracker</p>
            <div className={styles['chart-wrapper']}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={moodData}>
                        <XAxis
                            dataKey="day"
                            tick={false}
                            padding={{ left: 10, right: 10 }}
                            tickSize={0}
                            tickMargin={0}
                            height={1}
                        />
                        <YAxis
                            domain={[1, 6]}
                            tick={false}
                            padding={{ top: 10, bottom: 10 }}
                            tickSize={0}
                            tickMargin={0}
                            width={1}
                        />
                        <Line
                            type="basisCatmullRom"
                            dataKey="mood"
                            stroke="#343434"
                            strokeWidth={1}
                            dot={{ r: 2, fill: "#343434", stroke: "#343434" }}
                            activeDot={{ r: 1, fill: "#343434", stroke: "#343434" }}
                            isAnimationActive={false}
                            connectNulls={false}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};