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
  const [refreshKey, setRefreshKey] = useState(0);

  const bumpRefresh = () => setRefreshKey(k => k + 1);

  const goToToday = () => {
    const today = dayjs();
    navigate(`/dashboard/${today.year()}/${today.month()}/${today.date()}`);
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

    // Parse year/month/day directly from the pathname
  const pathParts = location.pathname.split('/').filter(Boolean);
  // pathname looks like /dashboard/2025/5/14
  // pathParts = ['dashboard', '2025', '5', '14']
  const year = Number(pathParts[1]);
  const month = Number(pathParts[2]);
  const day = Number(pathParts[3]);

  // Build the date — fall back to today if params aren't in the URL
  const popupDate = (year && month !== undefined && day)
    ? new Date(year, month, day)
    : new Date();

   /**
   * AUTO OPEN AT 10 PM IF NO ENTRY EXISTS
   * (assumes you already know whether today has an entry)
   */
  // useEffect(() => {
  //   const now = dayjs();

  //   const isAfter10PM = now.hour() >= 22;

  //   const hasDiaryEntryToday = false; // 🔴 replace with real value from API/state

  //   if (isAfter10PM && !hasDiaryEntryToday) {
  //     setIsMoodPopupOpen(true);
  //   }
  // }, []);

  return (
    <>
      <Navbar />

      <div className={styles['page']}>
        <DashboardHeader
          goToToday={goToToday}
          fromLanding={fromLanding}
          setFromLanding={setFromLanding}
          moodRefreshKey={refreshKey}
          onEntrySaved={bumpRefresh}
        />

        <div className={styles['outer']}>
          <NavigateViews onMoodClick={() => setIsMoodPopupOpen(true)} />

          {/* Pass refreshKey to any child route via Outlet context */}
          <div className={styles['container']}>
            <Outlet context={{ refreshKey }} />
          </div>

          <MoodInputPopup
            isOpen={isMoodPopupOpen}
            onClose={() => setIsMoodPopupOpen(false)}
            onSaved={bumpRefresh}
            date={popupDate}
          />
        </div>
      </div>
    </>
  );
};