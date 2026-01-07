import data from '../../diary_entries_2025.json';
import dayjs from 'dayjs';
import styles from './Day.module.css'
import { EntryCard } from './EntryCard';

export const Day = ({ selectedMonth, selectedDay }) => {
    console.log(dayjs().year(2025).month(selectedMonth).date(selectedDay).format("YYYY-MM-DD"));
    console.log(selectedMonth);

    const entries = data.diary_entries.filter(
        (entry) => entry.date === dayjs().year(2025).month(selectedMonth).date(selectedDay).format("YYYY-MM-DD")
    );

    return (
        <>
            <div className={styles['container']}>
                <div className={styles['day-component']}>
                    <p className={styles['month']}>
                        <span className={styles['year-month']}>2025</span>{dayjs().month(selectedMonth).date(selectedDay).format(" MMMM DD")}
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