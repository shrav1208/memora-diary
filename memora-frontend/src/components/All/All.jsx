
import styles from './All.module.css'
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../../utils/api';
import { YearCard } from './YearCard';

export const All = () => {

    const [years, setYears] = useState([]);
    const navigate = useNavigate();

    const onYearClick = (year) => {
        navigate(`/dashboard/${year}`);
    };

    useEffect(() => {
        const loadYears = async () => {
            try {
                const res = await api.get("/api/get/years");

                if (res.data.success) {
                    setYears(res.data.years);
                }
            } catch (err) {
                console.error("Failed to fetch diary entries:", err);
            }

        };

        loadYears();
    }, []);

    return (
        <>
            {years.length > 0 && (
                <div className={styles['years-collection']}>
                    {years.map((y) => (
                        <YearCard
                            key={y.year}
                            year={y.year}
                            count={y.count}
                            onClick={() => onYearClick(y.year)}
                        />
                    ))}
                </div>
            )}
        </>
    );
}