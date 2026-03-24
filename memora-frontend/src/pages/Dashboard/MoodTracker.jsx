import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    ResponsiveContainer
} from "recharts";
import styles from './MoodTracker.module.css'
import { useEffect, useState } from "react";
import api from "../../utils/api";

const MOOD_SCALE = {
    sad: 1,
    anxious: 2,
    neutral: 3,
    calm: 4,
    happy: 5,
    excited: 6,
};

export const MoodTracker = ({ refreshKey }) => {

    const [moodData, setMoodData] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const res = await api.get('/api/get/moods');
                const result = res.data.result.map(({ date, mood }) => ({
                    day: new Date(date).getDate(),
                    mood: MOOD_SCALE[mood] ?? null,
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
                setLoaded(true);
            } catch (err) {
                console.error("Failed to fetch moods:", err);
                setMoodData([]); // chart renders empty instead of crashing
                setLoaded(true);
            }
        })();
    }, [refreshKey]); // re-fetches whenever refreshKey changes

    return (
        <div className={styles['mood-card']}>
            <p className={styles['mood-heading']}>Mood Tracker</p>
                <div className={styles['chart-wrapper']} style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.4s ease' }} >
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