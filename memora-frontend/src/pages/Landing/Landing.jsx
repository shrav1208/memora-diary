import styles from './Landing.module.css'
import { Navbar } from '../../components/Navbar';
import { Link, useNavigate } from 'react-router';
import dayjs from 'dayjs';

export const Landing = ({ setFromLanding }) => {

    const navigate = useNavigate();

    const handleClickEvent = () => {
        setFromLanding(true);
        const today = dayjs();
        navigate(
            `/dashboard/${today.year()}/${today.month()}/${today.date()}`
        );
    }

    const goToYearView = () => {
        const today = dayjs();
        navigate(`/dashboard/${today.year()}`);
    };

    return (
        <>
            <Navbar />
            <div className={styles['container']}>

                <button
                    className={styles['big-inviting-button']}
                    onClick={handleClickEvent}
                >
                    <span className={styles['inner-text']}>What's on your <span className={styles['mind']}>mind</span> today?</span>
                    <span className={styles['inner-subtitle']}>Tap to start typing...</span>
                </button>

                <div className={styles['or-divider']}>
                    <div className={styles['line']}></div>
                    <p className={styles['or-text']}>or</p>
                    <div className={styles['line']}></div>
                </div>
                
                    <button className={styles['go-to-dashboard']} onClick={goToYearView}>
                        Go to my Dashboard
                    </button>
                
            </div>
        </>
    );
}