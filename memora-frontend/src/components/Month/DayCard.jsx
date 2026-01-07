import styles from './DayCard.module.css'

export const DayCard = ({ day, count }) => {
    return (
        <div className={styles[`${count === 0 ? 'day-card' : 'day-card-exist'}`]}>
            <p className={styles[`${count === 0 ? 'day-heading' : 'day-heading-exist'}`]}>{day}</p>
            <p className={styles[`${count === 0 ? 'count' : 'count-exist'}`]}>{count}</p>
        </div>
    );
}