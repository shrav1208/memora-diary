import data from '../../diary_entries_2025.json';
import dayjs from 'dayjs';
import styles from './Day.module.css'
import { Navbar } from '../../components/Navbar';
import { Dashboard } from '../Dashboard/Dashboard';
import { MonthCard } from '../Year/MonthCard';
import { EntryCard } from './EntryCard';
import { useEffect } from 'react';

export const Day = ({ selectedDay }) => {
    useEffect(() => {
    document.body.className = 'day-body';
    return () => {
      document.body.className = ''; // cleanup when leaving page
    };
  }, []);

    const entries = data.diary_entries.filter(
        (entry) => entry.date === selectedDay
    );

    return (
        <>
            <Navbar />
            <div className={styles['container']}>
                <Dashboard />
                <div className={styles['day-component']}>
                    <p className={styles['month']}>
                        <span className={styles['year-month']}>2025</span>{dayjs(selectedDay).format(" MMMM")} {dayjs(selectedDay).format(" DD")}
                    </p>
                    <div className={styles['entries-wrapper']}>
                        {entries.length > 0 ? (
                            entries.map((entry, index) => (
                                <EntryCard entry={entry} key={index} />
                            ))
                        ) : (
                            <p className={styles['no-entry']}>No entries for this day.</p> // change functionality later; day button should be non clickable instead of this
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}