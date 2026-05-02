import dayjs from 'dayjs';
import styles from './Month.module.css'
import { DayCard } from './DayCard'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../../utils/api';
import { Loader } from '../Loader/Loader';

export const Month = () => {

    const [days, setDays] = useState([]);
    const [loading, setLoading] = useState(true);

    const { year, month } = useParams();
    const navigate = useNavigate();

    // Get number of days in the chosen month (e.g., 28/30/31)
    const daysInMonth = dayjs().year(year).month(month).daysInMonth();

    const onDayClick = (day) => {
        navigate(`/dashboard/${year}/${month}/${day}`);
    };

    useEffect(() => {
        const loadDays = async () => {
            try {
                setLoading(true);
                const res = await api.get('/api/get/days', {
                    params: { year, month }
                });

                if (res.data.success) {
                    const dayMap = new Map(
                        res.data.days.map(d => [d.day, d.count])
                    );

                    const fullDays = Array.from({ length: daysInMonth }, (_, i) => ({
                        day: i + 1,
                        count: dayMap.get(i + 1) ?? 0
                    }));

                    const firstDayOfMonth = dayjs()
                        .year(year)
                        .month(month)
                        .date(1)
                        .day();

                    const calendarDays = [
                        ...Array(firstDayOfMonth).fill(null),
                        ...fullDays
                    ];

                    setDays(calendarDays);

                }
            } catch (err) {
                console.error("Failed to fetch diary entries:", err);
            } finally {
                setLoading(false);
            }
        };
        loadDays();
    }, [month, year, daysInMonth]);

    return (
        <>
            {loading ? (
                <Loader text="Loading month..." />
            ) : (
                <div className={`${styles['month-component']} ${styles.animate}`} >

                    <p className={styles['month']}>
                        <span className={styles['year-month']}>{year}</span>{dayjs().year(year).month(month).format(" MMMM")}
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
                        <div className={`${styles['days-collection']} ${styles.animate}`}>
                            {days.map((d, index) => (
                                d === null ? (
                                    <div key={`blank-${index}`} className={styles['empty-day']} />
                                ) : (
                                    <DayCard
                                        day={d.day}
                                        month={month}
                                        year={year}
                                        count={d.count}
                                        onClick={() => onDayClick(d.day)}
                                    />

                                )
                            ))}
                        </div>
                </div>
            )}
        </>
    );
};
