import styles from './Landing.module.css'
import { Navbar } from '../../components/Navbar';
import { useEffect } from 'react';

export const Landing = () => {
    useEffect(() => {
        document.body.className = 'landing-body';
        return () => {
            document.body.className = ''; // cleanup when leaving page
        };
    }, []);

    return (
        <>
            <Navbar />
            <div className={styles['container']}>

                <button className={styles['big-inviting-button']}>
                    <p className={styles['inner-text']}>What's on your <span className={styles['mind']}>mind</span> today?</p>
                    <p className={styles['inner-subtitle']}>Tap to start typing...</p>
                </button>
                <div className={styles['or-divider']}>
                    <div className={styles['line']}></div>
                    <p className={styles['or-text']}>or</p>
                    <div className={styles['line']}></div>
                </div>
                <button className={styles['go-to-dashboard']}>
                    Go to my Dashboard
                </button>
            </div>
        </>
    );
}