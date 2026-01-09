import { Navbar } from '../../components/Navbar';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { DashboardHeader } from './DashboardHeader';
import styles from './DashboardPage.module.css';
import { NavigateViews } from '../../components/NavigateViews';
import dayjs from 'dayjs';
import { useEffect } from 'react';

export const DashboardPage = ({ fromLanding, setFromLanding }) => {

  const navigate = useNavigate();

  const goToToday = () => {
    const today = dayjs();
    navigate(
      `/dashboard/${today.year()}/${today.month()}/${today.date()}`
    );
  };

  const location = useLocation();

  useEffect(() => {
    // ONLY redirect if user is exactly at /dashboard
    if (location.pathname === "/dashboard") {
      const today = dayjs();
      navigate(
        `/dashboard/${today.year()}/${today.month()}/${today.date()}`,
        { replace: true }
      );
    }
  }, [location.pathname, navigate]);

  return (
    <>
      <Navbar />

      <div className={styles['page']}>
        <DashboardHeader
          goToToday={goToToday}
          fromLanding={fromLanding}
          setFromLanding={setFromLanding}
        />

        <div className={styles['outer']}>

        <NavigateViews />

        {/* THIS is where Year / Month / Day swap */}
        <div className={styles['container']}><Outlet /></div>
        </div>
      </div>
    </>
  );
};
