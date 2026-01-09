import { Navbar } from '../../components/Navbar';
import { Outlet } from 'react-router';
import { DashboardHeader } from './DashboardHeader';
import styles from './DashboardPage.module.css';
import { NavigateViews } from '../../components/NavigateViews';

export const DashboardPage = ({
  selectedMonth,
  setSelectedMonth,
  selectedDay,
  setSelectedDay,
  fromLanding,
  setFromLanding,
}) => {

  return (
    <>
      <Navbar />

      <div className={styles['page']}>
        <DashboardHeader
          setSelectedMonth={setSelectedMonth}
          setSelectedDay={setSelectedDay}
          fromLanding={fromLanding}
          setFromLanding={setFromLanding}
        />

        <NavigateViews />

        {/* THIS is where Year / Month / Day swap */}
        <div className={styles['container']}><Outlet /></div>
        
      </div>
    </>
  );
};
