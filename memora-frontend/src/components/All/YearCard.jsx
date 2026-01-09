import styles from './YearCard.module.css'

export const YearCard = ({ year, count, onClick }) => {
  return (
    <div onClick={onClick} className={styles['year-card']}>
      <p className={styles['year']}>{year}</p>
      <p className={styles['count']}>{count}</p>
    </div>
  );
};