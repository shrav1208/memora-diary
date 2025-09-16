import { Navbar } from '../../components/Navbar';
import './Dashboard.css'
import dayjs from 'dayjs';
import { MonthCard } from './MonthCard';

export const Dashboard = () => {

    const months = Array.from({ length: 12 }, (_, i) =>
        dayjs().month(i).format("MMM") // "Jan", "Feb", etc.
    );

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
                        <div className='white-box box-1'>

                        </div>

                        <div className='right-boxes'>
                            <div className='white-box box-2'>

                            </div>

                            <div className='white-box box-3'>

                            </div>
                        </div>
                    </div>
                </div>

                <div className="year-component">
                    <p className='year'>
                        2025
                    </p>

                    <div className='months-collection'>
                        {months.map((month, index) => (
                                <MonthCard month={month} key={index}/>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}