import { useState, useEffect } from "react";
import styles from "./NavigateViews.module.css";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import dayjs from "dayjs";

export const NavigateViews = ({ onMoodClick }) => {
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

    const showMoodButton = Boolean(params.year && params.month && params.day);

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

            <div className={styles['right-side']}>
                {showMoodButton && (
                    <button
                        className={styles.mood}
                        onClick={onMoodClick}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="19"
                            height="18"
                            viewBox="0 0 19 18"
                            fill="none"
                        >
                            <path
                                d="M8.86133 1.5166C9.15415 1.04042 9.84586 1.04042 10.1387 1.5166L12.1318 4.75781C12.3127 5.05176 12.6072 5.25778 12.9453 5.32715L16.7275 6.10352C17.3028 6.22176 17.5251 6.92525 17.1221 7.35254L14.6035 10.0234C14.353 10.289 14.2308 10.6507 14.2695 11.0137L14.6562 14.6279C14.7167 15.1947 14.1472 15.619 13.6211 15.3994L9.98145 13.8799C9.6734 13.7513 9.3266 13.7513 9.01855 13.8799L5.37891 15.3994C4.85283 15.619 4.28334 15.1947 4.34375 14.6279L4.73047 11.0137C4.76922 10.6507 4.64696 10.289 4.39648 10.0234L1.87793 7.35254C1.47492 6.92524 1.69721 6.22176 2.27246 6.10352L6.05469 5.32715C6.3928 5.25778 6.68728 5.05176 6.86816 4.75781L8.86133 1.5166Z"
                                fill="#FFC4E7"
                                stroke="#343434"
                                strokeWidth="0.5"
                            />

                            <mask
                                id="mask0_1174_3293"
                                maskType="alpha"
                                maskUnits="userSpaceOnUse"
                                x="1"
                                y="0"
                                width="17"
                                height="16"
                            >
                                <path
                                    d="M8.86133 1.5166C9.15415 1.04042 9.84586 1.04042 10.1387 1.5166L12.1318 4.75781C12.3127 5.05176 12.6072 5.25778 12.9453 5.32715L16.7275 6.10352C17.3028 6.22176 17.5251 6.92525 17.1221 7.35254L14.6035 10.0234C14.353 10.289 14.2308 10.6507 14.2695 11.0137L14.6562 14.6279C14.7167 15.1947 14.1472 15.619 13.6211 15.3994L9.98145 13.8799C9.6734 13.7513 9.3266 13.7513 9.01855 13.8799L5.37891 15.3994C4.85283 15.619 4.28334 15.1947 4.34375 14.6279L4.73047 11.0137C4.76922 10.6507 4.64696 10.289 4.39648 10.0234L1.87793 7.35254C1.47492 6.92524 1.69721 6.22176 2.27246 6.10352L6.05469 5.32715C6.3928 5.25778 6.68728 5.05176 6.86816 4.75781L8.86133 1.5166Z"
                                    fill="#FFC4E7"
                                    stroke="#343434"
                                    strokeWidth="0.5"
                                />
                            </mask>

                            <g mask="url(#mask0_1174_3293)">
                                <g filter="url(#filter0_f_1174_3293)">
                                    <path
                                        d="M7.54343 6.44197C6.12054 9.1008 5.77784 11.5459 5.94146 12.5001C5.46263 12.0584 4.68672 8.71719 6.4495 6.28168C8.21228 3.84616 10.6359 3.14064 11.1147 3.58236C10.0173 3.5628 8.95437 4.00978 7.54343 6.44197Z"
                                        fill="white"
                                    />
                                </g>

                                <g filter="url(#filter1_f_1174_3293)">
                                    <path
                                        d="M12.0321 12.0026C13.0572 10.6097 13.4456 9.2397 13.4265 8.67765C13.6667 8.97498 13.8501 10.9617 12.6474 12.1954C11.4446 13.429 9.99829 13.61 9.7581 13.3127C10.3865 13.425 11.0316 13.2668 12.0321 12.0026Z"
                                        fill="white"
                                    />
                                </g>
                            </g>

                            <defs>
                                <filter
                                    id="filter0_f_1174_3293"
                                    x="4.35205"
                                    y="2.4585"
                                    width="7.7627"
                                    height="11.0415"
                                    filterUnits="userSpaceOnUse"
                                    colorInterpolationFilters="sRGB"
                                >
                                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                    <feBlend
                                        mode="normal"
                                        in="SourceGraphic"
                                        in2="BackgroundImageFix"
                                        result="shape"
                                    />
                                    <feGaussianBlur
                                        stdDeviation="0.5"
                                        result="effect1_foregroundBlur_1174_3293"
                                    />
                                </filter>

                                <filter
                                    id="filter1_f_1174_3293"
                                    x="8.85806"
                                    y="7.77773"
                                    width="5.64473"
                                    height="6.55977"
                                    filterUnits="userSpaceOnUse"
                                    colorInterpolationFilters="sRGB"
                                >
                                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                    <feBlend
                                        mode="normal"
                                        in="SourceGraphic"
                                        in2="BackgroundImageFix"
                                        result="shape"
                                    />
                                    <feGaussianBlur
                                        stdDeviation="0.45"
                                        result="effect1_foregroundBlur_1174_3293"
                                    />
                                </filter>
                            </defs>
                        </svg>
                        Log Mood
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


        </div>
    );
};
