import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";
import generateMoodData from "./generateMoodData";
import styles from './MoodTracker.module.css'

export const MoodTracker = () => {
    const moodData = generateMoodData();

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
                            type="basiscatmullRom"
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
