import './MonthCard.css'

export const MonthCard = ({ month, count }) => {
    return (
        <div className={count === 0 ? 'month-card' : 'month-card-exist'}>
            <p className={count === 0 ? 'month-heading' : 'month-heading-exist'}>{month}</p>
            <p className={count === 0 ? 'count' : 'count-exist'}>{count}</p>
        </div>
    );
}