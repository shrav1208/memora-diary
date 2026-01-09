
import styles from './All.module.css'
import { Link, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import axios from 'axios';
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
                const res = await axios.get("/api/get/years", {
                    withCredentials: true
                });
                console.log(res.data);
                
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
            <div className={styles['years-collection']}>
                {years.map((y) => (
                    <YearCard
                        key={y.year}
                        year={y.year}
                        count={y.count}
                        onClick={onYearClick(y.year)}
                    />
                ))}
            </div>
        </>
    );
}