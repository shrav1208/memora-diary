import styles from './MoodInputPopup.module.css';
import star from '../../assets/star-icon.png';
import red from '../../assets/emotion-red.png';
import blue from '../../assets/emotion-blue.png';
import green from '../../assets/emotion-green.png';
import purple from '../../assets/emotion-purple.png';
import orange from '../../assets/emotion-orange.png';
import yellow from '../../assets/emotion-yellow.png';

export const MoodInputPopup = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    return (
        <div className={styles['popup-overlay']} onClick={onClose}>
            <div className={styles['mood-pop-up']} onClick={(e) => e.stopPropagation()}>
                <div className={styles['upper-half']}>
                    <div className={styles['star-container']}>
                        <img src={star} className={styles['star']} alt='star' />
                    </div>
                    <p className={styles['heading']}>How are you feeling Today?</p>
                </div>
                <div className={styles['moods-container']}>
                    <div className={styles['mood-choice']}>
                        <button className={styles['mood-button']}> <img src={blue} className={styles['mood-img']} alt='blue' /> </button>
                        <p>Sad</p>
                    </div>

                    <div className={styles['mood-choice']}>
                        <button className={styles['mood-button']}> <img src={red} className={styles['mood-img']} alt='red' /> </button>
                        <p>Anxious</p>
                    </div>

                    <div className={styles['mood-choice']}>
                        <button className={styles['mood-button']}> <img src={green} className={styles['mood-img']} alt='green' /> </button>
                        <p>Neutral</p>
                    </div>

                    <div className={styles['mood-choice']}>
                        <button className={styles['mood-button']}> <img src={purple} className={styles['mood-img']} alt='purple' /> </button>
                        <p>Calm</p>
                    </div>

                    <div className={styles['mood-choice']}>
                        <button className={styles['mood-button']}> <img src={orange} className={styles['mood-img']} alt='orange' /> </button>
                        <p>Happy</p>
                    </div>

                    <div className={styles['mood-choice']}>
                        <button className={styles['mood-button']}> <img src={yellow} className={styles['mood-img']} alt='yellow' /> </button>
                        <p>Excited</p>
                    </div>
                </div>
                <div className={styles['save-button']}>Save Mood</div>
            </div>
        </div>
    );
};
