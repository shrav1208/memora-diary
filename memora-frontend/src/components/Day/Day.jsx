import dayjs from 'dayjs';
import styles from './Day.module.css';
import { EntryCard } from './EntryCard';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export const Day = () => {
  const navigate = useNavigate();
  const { year, month, day } = useParams();

  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const selectedDate = dayjs()
    .year(Number(year))
    .month(Number(month))   // 0-based
    .date(Number(day));

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await axios.get('/api/read/post', {
          params: {
            year: selectedDate.year(),
            month: selectedDate.month(),
            day: selectedDate.date(),
          },
        });

        setEntries(res.data.entries);
      } catch (err) {
        console.error('Failed to fetch diary entries:', err);
        setError('Could not load entries');
      } finally {
        setLoading(false);
      }
    };

    fetchEntries();
  }, [year, month, day]);

  return (
    <div className={styles['container']}>
      <div className={styles['day-component']}>
        <p className={styles['month']}>
          <span className={styles['year-month']}>
            {selectedDate.format('YYYY')}
          </span>
          {selectedDate.format(' MMMM D')}
        </p>

        <div className={styles['entries-wrapper']}>
          {loading && <p className={styles['no-entry']}>Loading...</p>}
          {error && <p className={styles['no-entry']}>{error}</p>}

          {!loading && !error && entries.length === 0 && (
            <p className={styles['no-entry']}>
              No entries for this day.
            </p>
          )}

          {!loading && !error &&
            entries.map((entry) => (
              <div
                key={entry._id}
                onClick={() =>
                  navigate(`/fullscreen-editor/${entry._id}`)
                }
              >
                <EntryCard entry={entry} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
