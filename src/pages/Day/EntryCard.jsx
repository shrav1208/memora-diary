import './EntryCard.css'

export const EntryCard = ({ entry }) => {
    return (
        <div key={entry.id} className="entry-card">
            <div className="entry-time">
                <span>{entry.time}</span>
            </div>
            <div className='vertical-separator'></div>
            <div className="entry-content">
                <p className="entry-title">{entry.title}</p>
                <p className="entry-text">{entry.content}</p>
            </div>
        </div>
    );
}