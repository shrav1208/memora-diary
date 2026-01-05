import styles from './Landing.module.css'
import { Navbar } from '../../components/Navbar';
import { useEffect } from 'react';
import { Link } from 'react-router';
import dayjs from 'dayjs';
import { LogoutButton } from '../../components/LogoutButton';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const Landing = ({ setFromLanding, setSelectedMonth, setSelectedDay }) => {

    const navigate = useNavigate();
    const { setUser } = useAuth();

    useEffect(() => {
        document.body.className = 'landing-body';
        return () => {
            document.body.className = ''; // cleanup when leaving page
        };
    }, []);

    const handleClickEvent = () => {
        setFromLanding(true);
        setSelectedMonth(dayjs().month());
        setSelectedDay(dayjs().date());
    }

    const handleLogout = async () => {
        try {
            await axios.post('/api/logout', {}, { withCredentials: true });
            setUser(null);
            navigate('/login', { replace: true });
        }catch (err) {
            console.error("Logout failed:", err);
        }
    };


    return (
        <>
            <Navbar />
            <div className={styles['container']}>

                <Link to='/day'>
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
                <Link to = '/year'>
                <button className={styles['go-to-dashboard']}>
                    Go to my Dashboard
                </button>
                </Link>

                <LogoutButton onClick={handleLogout}/>
            </div>
        </>
    );
}