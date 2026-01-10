import styles from './MonthCard.module.css'

export const MonthCard = ({ month, count, onClick }) => {
    return (
        <div className={styles[`${count === 0 ? 'month-card' : 'month-card-exist'}`]} onClick={onClick}>
            <p className={styles[`${count === 0 ? 'month-heading' : 'month-heading-exist'}`]}>{month}</p>
            <p className={styles[`${count === 0 ? 'count' : 'count-exist'}`]}>{count}</p>
        </div>
    );
}