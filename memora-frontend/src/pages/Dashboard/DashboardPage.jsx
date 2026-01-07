import { Navbar } from '../../components/Navbar';
import { Outlet } from 'react-router';
import { DashboardHeader } from './DashboardHeader';
import { useEffect } from 'react';
import styles from './DashboardPage.module.css';
import { useBodyClass } from '../../utils/useBodyClass';

export const DashboardPage = ({
  selectedMonth,
  setSelectedMonth,
  selectedDay,
  setSelectedDay,
  fromLanding,
  setFromLanding,
}) => {

  useBodyClass('day-body');

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
