import dayjs from 'dayjs';
import styles from './Day.module.css';
import { EntryCard } from './EntryCard';
import { useEffect, useState } from 'react';
import api from '../../utils/api';
import { useNavigate, useParams, useOutletContext } from 'react-router-dom';
import { Loader } from '../Loader/Loader';

export const Day = () => {
  const navigate = useNavigate();
  const { year, month, day } = useParams();
  const { refreshKey } = useOutletContext();

  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const selectedDate = dayjs()
    .year(Number(year))
    .month(Number(month))
    .date(Number(day));

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await api.get('/api/read/posts', {
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
  }, [year, month, day, refreshKey]); // re-fetches on new entry saved

  return (
    <div className={styles['container']}>
        {loading ? (
            <Loader text="Loading entries..." />
        ) : (
            <div className={`${styles['day-component']} ${styles.animate}`}>
              <p className={styles['month']}>
                <span className={styles['year-month']}>
                  {selectedDate.format('YYYY')}
                </span>
                {selectedDate.format(' MMMM D')}
              </p>

              <div className={`${styles['entries-wrapper']} ${styles.animate}`}>
                {error && <p className={styles['no-entry']}>{error}</p>}

                {!error && entries.length === 0 && (
                  <p className={styles['no-entry']}>
                    No entries for this day.
                  </p>
                )}

                {!error &&
                  entries.map((entry) => (
                    <div
                      key={entry._id}
                      role="button"
                      tabIndex="0"
                      onClick={() => navigate(`/fullscreen-editor/${entry._id}`)}
                    >
                      <EntryCard entry={entry} />
                    </div>
                  ))}
              </div>
            </div>
        )}
    </div>
  );
};