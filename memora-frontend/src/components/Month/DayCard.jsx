import dayjs from 'dayjs';
import styles from './DayCard.module.css'

export const DayCard = ({ day, month, year, count, onClick }) => {

    const isToday = dayjs().isSame(
        dayjs().year(year).month(month).date(day),
        'day'
    );

    const cardClass = [
        styles[count === 0 ? 'day-card' : 'day-card-exist'],
        isToday && styles['today']
    ].filter(Boolean).join(' ');

    const dayClass = [
        styles[count === 0 ? 'day-heading' : 'day-heading-exist'],
        isToday && styles['today-heading']
    ].filter(Boolean).join(' ');
    


    return (
        <div className={cardClass} onClick={onClick}>
            <p className={dayClass}>{day}</p>
            <p className={styles[`${count === 0 ? 'count' : 'count-exist'}`]}>{count}</p>
        </div>
    );
}