import { Navbar } from '../../components/Navbar';
import { Outlet, useNavigate } from 'react-router';
import { DashboardHeader } from './DashboardHeader';
import styles from './DashboardPage.module.css';
import { NavigateViews } from '../../components/NavigateViews';
import dayjs from 'dayjs';

export const DashboardPage = ({ fromLanding, setFromLanding }) => {

  const navigate = useNavigate();

  const goToToday = () => {
    const today = dayjs();
    navigate(
      `/dashboard/${today.year()}/${today.month()}/${today.date()}`
    );
  };

  return (
    <>
      <Navbar />

      <div className={styles['page']}>
        <DashboardHeader
          goToToday={goToToday}
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
