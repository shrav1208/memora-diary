import { useState, useEffect } from "react";
import styles from "./NavigateViews.module.css";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import dayjs from "dayjs";

export const NavigateViews = () => {
    const [view, setView] = useState("");

    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();

    // keep state in sync with URL
    useEffect(() => {
        if (location.pathname.includes("all")) {
            setView("all");
            return;
        }

        if (params.day !== undefined) {
            setView("day");
        }
        else if (params.month !== undefined) {
            setView("month");
        }
        else {
            setView("year");
        }
    }, [params, location.pathname]);

    const year = params.year ?? dayjs().year();
    const month = params.month ?? dayjs().month();
    const day = params.day ?? dayjs().date();

    const go = (nextView) => {
        setView(nextView);

        if (nextView === "all") navigate("/dashboard/all");
        if (nextView === "year") navigate(`/dashboard/${year}`);
        if (nextView === "month") navigate(`/dashboard/${year}/${month}`);
        if (nextView === "day") navigate(`/dashboard/${year}/${month}/${day}`);
    };

    const today = dayjs();
    const todayPath = `/dashboard/${today.year()}/${today.month()}/${today.date()}`;

    const goToToday = () => {
        navigate(todayPath);
    };

    // Only render the button if we're NOT on today's path
    const showDayButton = location.pathname !== todayPath;

    return (
        <div className={styles.container}>
            <button
                className={view === "all" ? styles.highlighted : styles.normal}
                onClick={() => go("all")}
            >
                All
            </button>

            {(view === "year" || view === "month" || view === "day") && (
                <button
                    className={view === "year" ? styles.highlighted : styles.normal}
                    onClick={() => go("year")}
                >
                    Year
                </button>
            )}

            {(view === "month" || view === "day") && (
                <button
                    className={view === "month" ? styles.highlighted : styles.normal}
                    onClick={() => go("month")}
                >
                    Month
                </button>
            )}

            {view === "day" && (
                <button
                    className={view === "day" ? styles.highlighted : styles.normal}
                    onClick={() => go("day")}
                >
                    Day
                </button>
            )}

            {showDayButton && (
                <button
                    className={styles.gototoday} // you can also use view state here if needed
                    onClick={goToToday}
                >
                    Go to Today
                </button>
            )}
        </div>
    );
};
