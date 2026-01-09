import dayjs from 'dayjs';
import styles from './Day.module.css'
import { EntryCard } from './EntryCard';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router';

export const Day = ({ selectedMonth, selectedDay }) => {

    const navigate = useNavigate();

    console.log(selectedMonth);

    const year = 2026;
    console.log(dayjs().year(year).month(selectedMonth).date(selectedDay).format("YYYY-MM-DD"));

    // const entries = data.diary_entries.filter(
    //     (entry) => entry.date === dayjs().year(2025).month(selectedMonth).date(selectedDay).format("YYYY-MM-DD")
    // );

    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const selectedDate = dayjs()
        .year(year)
        .month(selectedMonth)
        .date(selectedDay);

    useEffect(() => {
        const fetchEntries = async () => {
            try {
                setLoading(true);
                setError(null);

                const res = await axios.get("/api/read/post", {
                    params: {
                        year: selectedDate.year(),
                        month: selectedDate.month(), // 0-based
                        day: selectedDate.date(),
                    },
                });

                setEntries(res.data.entries);
                console.log(res.data);
            } catch (err) {
                console.error("Failed to fetch diary entries:", err);
                setError('Could not load entries');
            } finally {
                setLoading(false);
            }
        };

        fetchEntries();
    }, [selectedMonth, selectedDay]);


    return (
        <>
            <div className={styles['container']}>
                <div className={styles['day-component']}>
                    <p className={styles['month']}>
                        <span className={styles['year-month']}>
                            {selectedDate.format('YYYY')}
                        </span>
                        {selectedDate.format(' MMMM DD')}
                    </p>
                    <div className={styles['entries-wrapper']}>
                        {loading && (
                            <p className={styles['no-entry']}>Loading...</p>
                        )}

                        {error && (
                            <p className={styles['no-entry']}>{error}</p>
                        )}

                        {!loading && !error && entries.length === 0 && (
                            <p className={styles['no-entry']}>
                                No entries for this day.
                            </p>
                        )}

                        {!loading &&
                            !error &&
                            entries.map((entry) => (
                                <div 
                                    key={entry._id}
                                    onClick={()=>{
                                        navigate(`/fullscreen-editor/${entry._id}`);
                                    }}
                                >
                                    <EntryCard entry={entry} />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    );
}