import data from '../../diary_entries_2025.json';
import dayjs from 'dayjs';
import styles from './Year.module.css'
import { MonthCard } from './MonthCard';
import { Link, useNavigate, useParams } from 'react-router';

export const Year = () => {

    const { year } = useParams();
    const navigate = useNavigate();

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

    const onMonthClick = (month) => {
        navigate(`/dashboard/${year}/${month}`);
    };

    return (
        <>
            {/* <div className={styles['container']}> */}
            <div className={styles['year-component']}>
                <p className={styles['year']}>
                    2025
                </p>

                <div className={styles['months-collection']}>
                    {months.map((month, index) => (
                        <div onClick={() => onMonthClick(index)} key={index} ><MonthCard month={month} count={counts[index]} /></div>
                    ))}
                </div>
            </div>
            {/* </div> */}
        </>
    );
}