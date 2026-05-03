import styles from './Year.module.css'
import { MonthCard } from './MonthCard';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import api from '../../utils/api';
import { Loader } from '../Loader/Loader';

export const Year = () => {

    const [months, setMonths] = useState([]);
    const [loading, setLoading] = useState(true);

    const { year } = useParams();
    const navigate = useNavigate();

    const onMonthClick = (month) => {
        navigate(`/dashboard/${year}/${month}`);
    };

    useEffect(() => {
        const loadMonths = async () => {
            try {
                setLoading(true);
                const res = await api.get("/api/get/months", {
                    params: { year },
                });

                if (res.data.success) {
                    const monthMap = new Map(
                        res.data.months.map(m => [m.month, m.count])
                    );

                    const fullMonths = Array.from({ length: 12 }, (_, i) => ({
                        month: i,
                        count: monthMap.get(i) ?? 0
                    }));

                    setMonths(fullMonths);
                }

            } catch (err) {
                console.error("Failed to fetch diary entries:", err);
            } finally {
                setLoading(false);
            }

        };

        loadMonths();
    }, [year]);

    return (
        <>
            {loading ? (
                <Loader text="Loading year..." />
            ) : (
                <div className={`${styles['year-component']} ${styles.animate}`} >
                    <p className={styles['year']}>
                        {year}
                    </p>
                        <div className={`${styles['months-collection']} ${styles.animate}`}>
                            {months.map((m) => (
                                <MonthCard
                                    key={m.month}
                                    role="button"
                                    month={dayjs().month(m.month).format("MMM")}
                                    count={m.count}
                                    onClick={() => onMonthClick(m.month)}
                                />
                            ))}
                        </div>
                </div>
            )}
        </>
    );
}