import { Navbar } from '../../components/Navbar';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { DashboardHeader } from './DashboardHeader';
import styles from './DashboardPage.module.css';
import { NavigateViews } from '../../components/NavigateViews';
import dayjs from 'dayjs';
import { useEffect, useState, useRef } from 'react';
import { MoodInputPopup } from './MoodInputPopup';
import { motion, AnimatePresence } from 'motion/react';

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
  const popupDate = (year && !isNaN(month) && day)
    ? new Date(year, month, day)
    : new Date();

  // Determine view depth for slide direction
  const getViewIndex = (path) => {
    if (path.includes('/all')) return 0;
    const parts = path.split('/').filter(Boolean);
    if (parts.length === 2) return 1; // year
    if (parts.length === 3) return 2; // month
    if (parts.length === 4) return 3; // day
    return 3;
  };

  const currentIdx = getViewIndex(location.pathname);
  const prevIndex = useRef(currentIdx);
  const direction = useRef(1);

  if (currentIdx !== prevIndex.current) {
    // If pill moves right (current > prev), direction is 1 (enters from right +30, exits to left -30 = view shifts left)
    direction.current = currentIdx > prevIndex.current ? 1 : -1;
    prevIndex.current = currentIdx;
  }

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
          <div className={styles['container']} style={{ position: 'relative' }}>
            <AnimatePresence mode="wait" custom={direction.current}>
              <motion.div
                key={location.pathname}
                custom={direction.current}
                variants={{
                  initial: (dir) => ({ opacity: 0, x: dir * 30 }),
                  animate: { opacity: 1, x: 0 },
                  exit: (dir) => ({ opacity: 0, x: dir * -30 })
                }}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.25, ease: "easeInOut" }}
                style={{ width: "100%" }}
              >
                <Outlet context={{ refreshKey }} />
              </motion.div>
            </AnimatePresence>
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