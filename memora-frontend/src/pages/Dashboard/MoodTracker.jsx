import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";
// import generateMoodData from "./generateMoodData";
import styles from './MoodTracker.module.css'
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

export const MoodTracker = () => {

    const[moodData, setMoodData] = useState([]);

    useEffect(()=>{
        (async()=>{
            const res = await axios.get('/api/get/moods');
            // console.log(res.data.result);
            const result = res.data.result.map(({ date, score }) => ({
                day : new Date(date).getDate(),
                mood : score,
            }));

            const moodMap = new Map(result.map(item => [item.day, item.mood]));

            const fullMonth = Array.from({ length: 31 }, (_, i) => {
                const day = i + 1;
                return {
                    day,
                    mood: moodMap.has(day) ? moodMap.get(day) : null,
                };
            });
            // console.log(result);
            setMoodData(fullMonth);
        })();
    }, [])

    // console.log(moodData);

    return (
        <div className={styles['mood-card']}>
            <p className={styles['mood-heading']}>Mood Tracker</p>
            <div className={styles['chart-wrapper']}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={moodData}
                    >
                        <XAxis
                            dataKey="day"
                            tick={false}
                            padding={{ left: 10, right: 10 }}
                            tickSize={0}
                            tickMargin={0}
                            height={1}
                        />
                        <YAxis
                            domain={[1, 5]}
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
                            dot={{ r: 2, fill: "#343434", stroke: "#343434" }} // smaller solid dot
                            activeDot={{ r: 1, fill: "#343434", stroke: "#343434" }} // same size on hover
                            isAnimationActive={false} // disables mount animation
                        />

                    </LineChart>

                </ResponsiveContainer>
            </div>

        </div>

    );
};
