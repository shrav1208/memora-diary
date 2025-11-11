import dayjs from "dayjs";
import styles from './TodayDate.module.css';

export const TodayDate = () => {

    const dayMonth = dayjs().format("DD MMM");
    const year = dayjs().format("YYYY");
    const day = dayjs().format("dddd").toUpperCase();
    
    return (
        <div className={styles['date-card']}>
            <div className={styles['date-box']}>
                <p className={styles['today']}>Today</p>
                <div className={styles['date-text']}>
                    <p className={styles['date-day']}>{day}</p>
                    <p className={styles['date-day-month']}>{dayMonth}</p>
                    <p className={styles['date-year']}>{year}</p>
                </div>
            </div>
        </div>
    );
}