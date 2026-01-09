import { useState } from 'react';
import styles from './NavigateViews.module.css';

export const NavigateViews = () => {

    const [view, setView] = useState('day');

    return (
        <>
            <div className={styles['container']}>
                
                {(view === 'all' || view === 'year' || view === 'month' || view === 'day') && 
                <button className={(view === 'all') ? styles['highlighted'] : styles['normal']} onClick={() => {setView('all')}}>
                    All
                </button>
                }
                
                {(view === 'year' || view === 'month' || view === 'day') && 
                <button className={(view === 'year') ? styles['highlighted'] : styles['normal']} onClick={() => {setView('year')}}>
                    Year
                </button>
                }

                {(view === 'month' || view === 'day') && 
                <button className={(view === 'month') ? styles['highlighted'] : styles['normal']} onClick={() => {setView('month')}}>
                    Month
                </button>
                }

                {(view === 'day') && 
                <button className={(view === 'day') ? styles['highlighted'] : styles['normal']} onClick={() => {setView('day')}}>
                    Day
                </button>
                }

            </div>
        </>
    );
}