import dayjs from "dayjs";
import './TodayDate.css';

export const TodayDate = () => {

    const dayMonth = dayjs().format("DD MMM");
    const year = dayjs().format("YYYY");
    const day = dayjs().format("dddd").toUpperCase();
    
    return (
        <div className="date-card">
            <div className="date-box">
                <p className="today">Today</p>
                <div className="date-text">
                    <p className="date-day">{day}</p>
                    <p className="date-day-month">{dayMonth}</p>
                    <p className="date-year">{year}</p>
                </div>
            </div>
        </div>
    );
}