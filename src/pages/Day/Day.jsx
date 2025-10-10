import data from '../../diary_entries_2025.json';
import dayjs from 'dayjs';
import './Day.css'
import { Navbar } from '../../components/Navbar';
import { Dashboard } from '../Dashboard/Dashboard';
import { MonthCard } from '../Year/MonthCard';
import { EntryCard } from './EntryCard';

export const Day = ({ selectedDay }) => {

    const entries = data.diary_entries.filter(
        (entry) => entry.date === selectedDay
    );

    return (
        <>
            <Navbar />
            <div className="container">
                <Dashboard />
                <div className="day-component">
                    <p className='month'>
                        <span className='year-month'>2025</span>{dayjs(selectedDay).format(" MMMM")} {dayjs(selectedDay).format(" DD")}
                    </p>
                    <div className="entries-wrapper">
                        {entries.length > 0 ? (
                            entries.map((entry, index) => (
                                <EntryCard entry={entry} key={index} />
                            ))
                        ) : (
                            <p className="no-entry">No entries for this day.</p> // change functionality later; day button should be non clickable instead of this
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}