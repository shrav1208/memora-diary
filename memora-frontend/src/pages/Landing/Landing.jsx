import styles from './Landing.module.css'
import { Navbar } from '../../components/Navbar';
import { Link } from 'react-router';
import dayjs from 'dayjs';
import { useBodyClass } from '../../utils/useBodyClass';

export const Landing = ({ setFromLanding, setSelectedMonth, setSelectedDay }) => {

    useBodyClass('landing-body');

    const handleClickEvent = () => {
        setFromLanding(true);
        setSelectedMonth(dayjs().month());
        setSelectedDay(dayjs().date());
    }

    return (
        <>
            <Navbar />
            <div className={styles['container']}>

                <Link to='/dashboard/day'>
                <button 
                    className={styles['big-inviting-button']}
                    onClick={handleClickEvent}
                >
                    <span className={styles['inner-text']}>What's on your <span className={styles['mind']}>mind</span> today?</span>
                    <span className={styles['inner-subtitle']}>Tap to start typing...</span>
                </button>
                </Link>
                <div className={styles['or-divider']}>
                    <div className={styles['line']}></div>
                    <p className={styles['or-text']}>or</p>
                    <div className={styles['line']}></div>
                </div>
                <Link to = '/dashboard/year'>
                <button className={styles['go-to-dashboard']}>
                    Go to my Dashboard
                </button>
                </Link>
            </div>
        </>
    );
}