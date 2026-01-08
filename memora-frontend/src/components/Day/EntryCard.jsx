import styles from './EntryCard.module.css'
import { removeFormatting } from "../../utils/removeFormatting";

export const EntryCard = ({ entry }) => {

    const paragraphs = removeFormatting(entry.content);

    return (
        <button key={entry.id} className={styles['entry-card']} onClick={}>
             <div className={styles['entry-time']}>
                <span>
                    {new Date(entry.createdAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
                </span>
            </div>
            <div className={styles['vertical-separator']}></div>
            <div className={styles['entry-content']}>
                <p className={styles['entry-title']}>{entry.title}</p>
                <div className={styles['entry-text']}>
                    {paragraphs.map((text, idx) => (
                        <p key={idx}>{text}</p>
                    ))}
                </div>
            </div>
        </button>
    );
}