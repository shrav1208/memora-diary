import { Navbar } from '../../components/Navbar';
import './Dashboard.css'
import dayjs from 'dayjs';
import { MonthCard } from './MonthCard';
import { TodayDate } from './TodayDate';
import { QuoteCard } from './QuoteCard';
import { MoodTracker } from './MoodTracker';
import data from '../../diary_entries_2025.json';

export const Dashboard = () => {

    const months = Array.from({ length: 12 }, (_, i) =>
        dayjs().month(i).format("MMM") // "Jan", "Feb", etc.
    );

    // Make an array of 12 zeros
    const counts = Array(12).fill(0);

    // Count how many diary entries per month
    data.diary_entries.forEach(item => {
        const monthIndex = dayjs(item.date).month(); // 0–11
        counts[monthIndex] += 1;
    });

    return (
        <>
            <Navbar />
            <div className="container">
                <div className="dashboard-header">
                    <div className="name-flex">
                        <h1 className="name">Shravani's Diary</h1>
                        <input className='search-box' placeholder="Search your memories..." />
                    </div>

                    <div className="features-flex">

                        <QuoteCard />

                        <div className='right-boxes'>
                            <TodayDate />
                            <MoodTracker />
                        </div>
                    </div>
                </div>

                <div className="year-component">
                    <p className='year'>
                        2025
                    </p>

                    <div className='months-collection'>
                        {months.map((month, index) => (
                            <MonthCard month={month} key={index} count={counts[index]}/>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}