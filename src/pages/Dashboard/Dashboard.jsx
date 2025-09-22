import { Navbar } from '../../components/Navbar';
import './Dashboard.css'
import dayjs from 'dayjs';
import { MonthCard } from './MonthCard';
import { TodayDate } from './TodayDate';
import { QuoteCard } from './QuoteCard';
import { MoodTracker } from './MoodTracker';
import data from '../../diary_entries_2025.json';
import plusIcon from '../../assets/plus-icon.svg'

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
                        <div className='left-half'>
                            <h1 className="name">Shravani's Diary</h1>
                            <div className='plus-icon'>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="58"
                                    height="58"
                                    viewBox="0 0 58 58"
                                    fill="none"
                                    overflow="visible"   // ✅ prevents clipping
                                >
                                    <foreignObject x="-197.3" y="-197.3" width="452.6" height="452.6">
                                        <div
                                            xmlns="http://www.w3.org/1999/xhtml"
                                            style={{
                                                backdropFilter: "blur(98.65px)",
                                                clipPath: "url(#bgblur_0_265_3410_clip_path)",
                                                height: "100%",
                                                width: "100%",
                                            }}
                                        />
                                    </foreignObject>

                                    {/* Circle with drop shadow filter */}
                                    <circle
                                        data-figma-bg-blur-radius="197.3"
                                        cx="29"
                                        cy="29"
                                        r="27.5"
                                        fill="url(#paint0_linear_265_3410)"
                                        stroke="url(#paint1_linear_265_3410)"
                                        strokeWidth="3"
                                        filter="url(#dropShadow)"   // ✅ shadow applied here
                                    />

                                    <defs>
                                        {/* Drop shadow filter */}
                                        <filter id="dropShadow" x="-50%" y="-50%" width="200%" height="200%">
                                            <feDropShadow
                                                dx="0"
                                                dy="2"
                                                stdDeviation="3.5"
                                                floodColor="black"
                                                floodOpacity="0.25"
                                            />
                                        </filter>

                                        <clipPath id="bgblur_0_265_3410_clip_path" transform="translate(197.3 197.3)">
                                            <circle cx="29" cy="29" r="27.5" />
                                        </clipPath>

                                        <linearGradient
                                            id="paint0_linear_265_3410"
                                            x1="28"
                                            y1="-1.78894e-06"
                                            x2="57.3822"
                                            y2="26.4977"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#94DDFF" />
                                            <stop offset="1" stopColor="#DBF4FF" stopOpacity="0.88" />
                                        </linearGradient>

                                        <linearGradient
                                            id="paint1_linear_265_3410"
                                            x1="30" y1="57" x2="29" y2="-13.5"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#92DCFF" />
                                            <stop offset="1" stopColor="#EEFAFF" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                                <img src={plusIcon} className='plus' />
                            </div>




                        </div>
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
                            <MonthCard month={month} key={index} count={counts[index]} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}