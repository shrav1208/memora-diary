import styles from './Loader.module.css';

export const Loader = ({ text = "Loading..." }) => {
    return (
        <div className={styles['loader-container']}>
            <div className={styles.spinner}></div>
            <p className={styles.text}>{text}</p>
        </div>
    );
};
