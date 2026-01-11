import styles from './SearchPopup.module.css';
import { Link } from 'react-router-dom';
import { removeFormatting } from "../utils/removeFormatting";

export const SearchPopup = ({ results, onClose }) => {

    // const highlightText = (text, query) => {
    //     if (!query) return text;

    //     const regex = new RegExp(`(${query})`, 'gi');

    //     return text.split(regex).map((part, index) =>
    //         regex.test(part) ? (
    //             <mark key={index}>{part}</mark>
    //         ) : (
    //             part
    //         )
    //     );
    // };

    const formatDateTime = (isoDate) => {
        const date = new Date(isoDate);

        const displayDate = date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });

        const displayTime = date.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
        });

        return `${displayDate} ${displayTime}`;
    };


    return (
        <>
            {/* Backdrop */}
            <div className={styles.backdrop} onClick={onClose} />

            {/* Popup */}
            <div className={styles.popup}>
                {results.length === 0 ? (
                    <p className={styles.empty}>No results found</p>
                ) : (
                    results.map((entry) => (
                        <Link
                            key={entry._id}
                            to={`/fullscreen-editor/${entry._id}`}
                            className={styles.result}
                            onClick={onClose}
                        >
                            <div className={styles.textBlock}>
                                <div className={styles['title-and-date']}>
                                    <p className={styles.title}>{entry.title}</p>

                                    <div className={styles['display-date']}>
                                        {formatDateTime(entry.createdAt)}
                                    </div>
                                </div>

                                <p className={styles.content}>
                                    {removeFormatting(entry.content?.slice(0, 120) + '…')}
                                </p>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </>
    );
};
