import data from '../../diary_entries_2025.json';
import dayjs from 'dayjs';
import styles from './Year.module.css'
import { Navbar } from '../../components/Navbar';
import { Dashboard } from '../Dashboard/Dashboard';
import { MonthCard } from '../Year/MonthCard';
import { useEffect } from 'react';

export const Year = () => {
    useEffect(() => {
        document.body.className = 'year-body';
        return () => {
            document.body.className = ''; // cleanup when leaving page
        };
    }, []);

    const months = Array.from({ length: 12 }, (_, i) =>
        dayjs().month(i).format("MMM") // "Jan", "Feb", etc.
    );

    // Make an array of 12 zeros
    const counts = Array(12).fill(0);

    // Count how many diary entries per month
    data.diary_entries.forEach(item => {
        const monthIndex = dayjs(item.date).month(); // 0–11
        counts[monthIndex] += 1;
    });

    return (
        <>

            <Navbar />
            <div className={styles['container']}>
                <Dashboard />
                <div className={styles['year-component']}>
                    <p className={styles['year']}>
                        2025
                    </p>

                    <div className={styles['months-collection']}>
                        {months.map((month, index) => (
                            <MonthCard month={month} key={index} count={counts[index]} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}