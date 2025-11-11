import styles from './EntryCard.module.css'

export const EntryCard = ({ entry }) => {
    return (
        <div key={entry.id} className={styles['entry-card']}>
            <div className={styles['entry-time']}>
                <span>{entry.time}</span>
            </div>
            <div className={styles['vertical-separator']}></div>
            <div className={styles['entry-content']}>
                <p className={styles['entry-title']}>{entry.title}</p>
                <p className={styles['entry-text']}>{entry.content}</p>
            </div>
        </div>
    );
}