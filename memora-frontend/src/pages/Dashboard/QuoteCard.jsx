import { useEffect } from 'react';
import styles from './QuoteCard.module.css'
import { useState } from 'react';
import axios from 'axios';

export const QuoteCard = () => {
    const [reflection, setReflection] = useState(null);

    useEffect(() => {
        const fetchReflection = async () => {
            const res = await axios.get("/api/get/today-reflection", {
                withCredentials: true
            });
            setReflection(res.data?.reflection);
            console.log("API response:", res.data);
        };

        fetchReflection();
    }, []);

    return (
        <div className={styles['quote-card']}>
            <p className={styles['quote-heading']}>
                {reflection?.heading || "Keep Moving Forward"}
            </p>
            <p className={styles['quote']}>
                {reflection?.body ||
                    "Life is rarely a straight road; there will be obstacles, delays, and unexpected turns. What matters is that you keep moving, even if your steps are small. Progress is progress, and every little effort compounds over time into something meaningful."}
            </p>
        </div>
    );
};