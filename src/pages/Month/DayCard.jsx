import './DayCard.css'

export const DayCard = ({ day, count }) => {
    return (
        <div className={count === 0 ? 'day-card' : 'day-card-exist'}>
            <p className={count === 0 ? 'day-heading' : 'day-heading-exist'}>{day}</p>
            <p className={count === 0 ? 'count' : 'count-exist'}>{count}</p>
        </div>
    );
}