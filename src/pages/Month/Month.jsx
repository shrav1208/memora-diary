import data from '../../diary_entries_2025.json';
import dayjs from 'dayjs';
import './Month.css'
import { Navbar } from '../../components/Navbar';
import { Dashboard } from '../Dashboard/Dashboard';
import { DayCard } from './DayCard'

export const Month = ({ selectedMonth }) => {

    // Get number of days in the chosen month (e.g., 28/30/31)
    const daysInMonth = dayjs().month(selectedMonth).daysInMonth();

    // Create array of day numbers: 1, 2, 3, ...
    const firstDayOfMonth = dayjs().month(selectedMonth).day(); // 0=Sun, 1=Mon, etc.

    // Create empty slots before the 1st
    const blanks = Array(firstDayOfMonth).fill(null);

    // Create day numbers for the month
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    // Combine both
    const allDays = [...blanks, ...days];


    // Count entries for each day
    const counts = Array(daysInMonth).fill(0);
    data.diary_entries.forEach(item => {
        const date = dayjs(item.date);
        if (date.month() === selectedMonth) {
            const dayIndex = date.date() - 1; // 0-based index
            counts[dayIndex] += 1;
        }
    });

    return (
        <>
            <Navbar />
            <div className="container">
                <Dashboard />
                <div className="month-component">

                    <p className='month'>
                        <span className='year-month'>2025</span>{dayjs().month(selectedMonth).format(" MMMM")}
                    </p>

                    <div className='weekdays'>
                        <p>S</p>
                        <p>M</p>
                        <p>T</p>
                        <p>W</p>
                        <p>T</p>
                        <p>F</p>
                        <p>S</p>
                    </div>

                    <div className='days-collection'>
                        {allDays.map((day, index) =>
                            day ? (
                                <DayCard day={day} key={index} count={counts[day - 1]} />
                            ) : (
                                <div key={index} className="empty-day" /> // blank placeholder
                            )
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};
