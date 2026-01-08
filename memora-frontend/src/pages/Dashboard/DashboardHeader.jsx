import styles from './DashboardHeader.module.css'
import { TodayDate } from './TodayDate';
import { QuoteCard } from './QuoteCard';
import { MoodTracker } from './MoodTracker';
import plusIcon from '../../assets/plus-icon.svg'
import dayjs from 'dayjs';
import axios from 'axios';
import { useEffect, useState } from "react";
import { PopupInput } from "../../components/PopupInput";
import { Link } from 'react-router-dom';

export const DashboardHeader = ({ setSelectedMonth, setSelectedDay, fromLanding, setFromLanding }) => {

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [name, setName] = useState('');
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    useEffect(()=>{
        if(!query.trim()) {
            setResults([]);
            return;
        }

        const timeout = setTimeout (async () => {
            const res = await axios.get('/api/search');
            console.log(res.data);
            setResults(res);
        }, 300);
        
        return () => clearTimeout(timeout)
    }, [query])

    useEffect(()=>{
        (async()=>{
            try{
                const res = await axios.get('/api/read/user', { withCredentials: true });
                // console.log(res.data);
                setName(res.data.user.name);
            }catch(err){
                console.error(err.message);
            }
            
        })();
    }, [])

    useEffect(() => {
        if (fromLanding) {
            setIsPopupOpen(true);
            setFromLanding(false);
        }
    }, [fromLanding, setFromLanding]);

    const handleButtonClick = () => {
        setIsPopupOpen(true); // open popup on button click
        setSelectedDay(dayjs().date());
        setSelectedMonth(dayjs().month());
    };

    const handleClose = () => {
        setIsPopupOpen(false); // close popup
    };

    const handleSubmit = (value) => {
        console.log("User input:", value); // handle submitted value
    };


    return (
        <>

            <div className={styles['dashboard-header']}>
                <div className={styles['name-flex']}>
                    <div className={styles['left-half']}>
                        <h1 className={styles['name']}>{name}'s diary</h1>
                        <div className={styles['plus-icon']} onClick={handleButtonClick}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="58"
                                height="58"
                                viewBox="0 0 58 58"
                                fill="none"
                                overflow="visible"   // prevents clipping
                            >
                                <foreignObject x="0" y="0" width="58" height="58">
                                    <div
                                        xmlns="http://www.w3.org/1999/xhtml"
                                        style={{
                                            backdropFilter: "blur(98.65px)",
                                            clipPath: "url(#bgblur_0_265_3410_clip_path)",
                                            height: "100%",
                                            width: "100%",
                                        }}
                                    />
                                </foreignObject>

                                {/* Circle with drop shadow filter */}
                                <circle
                                    data-figma-bg-blur-radius="197.3"
                                    cx="29"
                                    cy="29"
                                    r="27.5"
                                    fill="url(#paint0_linear_265_3410)"
                                    stroke="url(#paint1_linear_265_3410)"
                                    strokeWidth="3"
                                    filter="url(#dropShadow)"   // ✅ shadow applied here
                                />

                                <defs>
                                    {/* Drop shadow filter */}
                                    <filter id="dropShadow" x="-50%" y="-50%" width="200%" height="200%">
                                        <feDropShadow
                                            dx="0"
                                            dy="2"
                                            stdDeviation="3.5"
                                            floodColor="black"
                                            floodOpacity="0.25"
                                        />
                                    </filter>

                                    <clipPath id="bgblur_0_265_3410_clip_path" transform="translate(197.3 197.3)">
                                        <circle cx="29" cy="29" r="27.5" />
                                    </clipPath>

                                    <linearGradient
                                        id="paint0_linear_265_3410"
                                        x1="28"
                                        y1="-1.78894e-06"
                                        x2="57.3822"
                                        y2="26.4977"
                                        gradientUnits="userSpaceOnUse"
                                    >
                                        <stop stopColor="#94DDFF" />
                                        <stop offset="1" stopColor="#DBF4FF" stopOpacity="0.88" />
                                    </linearGradient>

                                    <linearGradient
                                        id="paint1_linear_265_3410"
                                        x1="30" y1="57" x2="29" y2="-13.5"
                                        gradientUnits="userSpaceOnUse"
                                    >
                                        <stop stopColor="#92DCFF" />
                                        <stop offset="1" stopColor="#EEFAFF" />
                                    </linearGradient>
                                </defs>
                            </svg>
                            <img src={plusIcon} className={styles['plus']} />
                        </div>
                    </div>
                    <input 
                    className={styles['search-box']} 
                    placeholder="Search your memories..." 
                    onChange={(event)=>{setQuery(event.target.value);}}
                    value = {query}
                    />
                </div>

                <div className={styles['features-flex']}>

                    <QuoteCard />

                    <div className={styles['right-boxes']}>
                        <TodayDate />
                        <MoodTracker />
                    </div>
                </div>
            </div>



            <PopupInput
                isOpen={isPopupOpen}
                onClose={handleClose}
                onSubmit={handleSubmit}
            />
        </>
    );
}