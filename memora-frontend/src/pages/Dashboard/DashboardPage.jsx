import { Navbar } from '../../components/Navbar';
import { Outlet } from 'react-router';
import { DashboardHeader } from './DashboardHeader';
import { useEffect } from 'react';
import styles from './DashboardPage.module.css';

export const DashboardPage = ({
  selectedMonth,
  setSelectedMonth,
  selectedDay,
  setSelectedDay,
  fromLanding,
  setFromLanding,
}) => {

  useEffect(() => {
    document.body.className = 'day-body'; // shared bg
    return () => document.body.className = '';
  }, []);

  return (
    <>
      <Navbar />

      <div className={styles['container']}>
        <DashboardHeader
          setSelectedMonth={setSelectedMonth}
          setSelectedDay={setSelectedDay}
          fromLanding={fromLanding}
          setFromLanding={setFromLanding}
        />

        {/* THIS is where Year / Month / Day swap */}
        <div className={styles['container']}><Outlet /></div>
        
      </div>
    </>
  );
};
