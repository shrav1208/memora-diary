import styles from './QuoteCard.module.css'

export const QuoteCard = () => {
    return (
        <div className={styles['quote-card']}>
            <p className={styles['quote-heading']}>Keep Moving Forward</p>
            <p className={styles['quote']}>Life is rarely a straight road; there will be obstacles, delays, and unexpected turns. What matters is that you keep moving, even if your steps are small. Progress is progress, and every little effort compounds over time into something meaningful.</p>
        </div>
    );
}