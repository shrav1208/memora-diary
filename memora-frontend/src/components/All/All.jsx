
import styles from './All.module.css'
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../../utils/api';
import { YearCard } from './YearCard';
import { Loader } from '../Loader/Loader';

export const All = () => {

    const [years, setYears] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const onYearClick = (year) => {
        navigate(`/dashboard/${year}`);
    };

    useEffect(() => {
        const loadYears = async () => {
            try {
                setLoading(true);
                const res = await api.get("/api/get/years");

                if (res.data.success) {
                    setYears(res.data.years);
                }
            } catch (err) {
                console.error("Failed to fetch diary entries:", err);
            } finally {
                setLoading(false);
            }

        };

        loadYears();
    }, []);

    return (
        <>
            {loading ? (
                <Loader text="Loading timeline..." />
            ) : (
                <div className={`${styles['years-collection']} ${styles.animate}`}>
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