import styles from './Year.module.css'
import { MonthCard } from './MonthCard';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import api from '../../utils/api';

export const Year = () => {

    const [months, setMonths] = useState([]);

    const { year } = useParams();
    const navigate = useNavigate();

    const onMonthClick = (month) => {
        navigate(`/dashboard/${year}/${month}`);
    };

    useEffect(() => {
        const loadMonths = async () => {
            try {
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
            }

        };

        loadMonths();
    }, [year]);

    return (
        <>
            {/* <div className={styles['container']}> */}
            <div className={styles['year-component']}>
                <p className={styles['year']}>
                    {year}
                </p>
                {months.length > 0 && (
                    <div className={styles['months-collection']}>
                        {months.map((m) => (
                            <MonthCard
                                key={m.month}
                                month={dayjs().month(m.month).format("MMM")}
                                count={m.count}
                                onClick={() => onMonthClick(m.month)}
                            />
                        ))}
                    </div>
                )}
            </div>
            {/* </div> */}
        </>
    );
}