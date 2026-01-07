import data from '../../diary_entries_2025.json';
import dayjs from 'dayjs';
import styles from './Month.module.css'
import { DayCard } from './DayCard'
import { Link } from 'react-router';

export const Month = ({ selectedMonth, setSelectedDay }) => {
    console.log(selectedMonth);

    // Get number of days in the chosen month (e.g., 28/30/31)
    const daysInMonth = dayjs().month(selectedMonth).daysInMonth();

    // Create array of day numbers: 1, 2, 3, ...
    const firstDayOfMonth = dayjs().month(selectedMonth).day(); // 0=Sun, 1=Mon, etc.

    // Create empty slots before the 1st
    const blanks = Array(firstDayOfMonth).fill(null);

    // Create day numbers for the month
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    // Combine both
    const allDays = [...blanks, ...days];


    // Count entries for each day
    const counts = Array(daysInMonth).fill(0);
    data.diary_entries.forEach(item => {
        const date = dayjs(item.date);
        if (date.month() === selectedMonth) {
            const dayIndex = date.date() - 1; // 0-based index
            counts[dayIndex] += 1;
        }
    });

    const handleDay = (day) => {
        setSelectedDay(day);
    }

    return (
        <>
            {/* <div className={styles['container']}> */}
                <div className={styles['month-component']}>

                    <p className={styles['month']}>
                        <span className={styles['year-month']}>2025</span>{dayjs().month(selectedMonth).format(" MMMM")}
                    </p>

                    <div className={styles['weekdays']}>
                        <p>S</p>
                        <p>M</p>
                        <p>T</p>
                        <p>W</p>
                        <p>T</p>
                        <p>F</p>
                        <p>S</p>
                    </div>

                    <div className={styles['days-collection']}>
                        {allDays.map((day, index) =>
                            day ? (
                                <Link to="/dashboard/day" onClick={() => handleDay(day)} key={index} ><DayCard day={day} count={counts[day - 1]} /></Link>
                            ) : (
                                <div key={index} className={styles['empty-day']} /> // blank placeholder
                            )
                        )}
                    </div>
                </div>
            {/* </div> */}
        </>
    );
};
