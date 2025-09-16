import './MonthCard.css'

export const MonthCard = ({ month }) => {
    return (
        <div className="month-card">
            <p className='month-heading'>{month}</p>
            <p className='count'>0</p>
        </div>
    );
}