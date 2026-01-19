import { Navbar } from '../../components/Navbar';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { DashboardHeader } from './DashboardHeader';
import styles from './DashboardPage.module.css';
import { NavigateViews } from '../../components/NavigateViews';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { MoodInputPopup } from './MoodInputPopup';

export const DashboardPage = ({ fromLanding, setFromLanding }) => {

  const navigate = useNavigate();
    const [isMoodPopupOpen, setIsMoodPopupOpen] = useState(false);

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

   /**
   * AUTO OPEN AT 10 PM IF NO ENTRY EXISTS
   * (assumes you already know whether today has an entry)
   */
  useEffect(() => {
    const now = dayjs();

    const isAfter10PM = now.hour() >= 22;

    const hasDiaryEntryToday = false; // 🔴 replace with real value from API/state

    if (isAfter10PM && !hasDiaryEntryToday) {
      setIsMoodPopupOpen(true);
    }
  }, []);

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

        <NavigateViews onMoodClick={() => setIsMoodPopupOpen(true)} />

        {/* THIS is where Year / Month / Day swap */}
        <div className={styles['container']}><Outlet /></div>
        <MoodInputPopup
            isOpen={isMoodPopupOpen}
            onClose={() => setIsMoodPopupOpen(false)}
          />
        </div>
      </div>
    </>
  );
};
