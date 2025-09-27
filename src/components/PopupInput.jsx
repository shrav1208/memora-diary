import React, { useState } from "react";
import "./PopupInput.css";
import tickmark from '../assets/tickmark.svg'
import dayjs from "dayjs";
import expandButton from '../assets/expand.svg'

export const PopupInput = ({ isOpen, onClose, onSubmit }) => {
    const [inputTitle, setInputTitle] = useState("");
    const [inputText, setInputText] = useState("");

    const displayDate = dayjs().format('ddd, YYYY MMM D, H:mm A')

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(inputTitle);
        setInputTitle("Title");                    
        onClose();
    };

    if (!isOpen) return null; // hide popup when not open

    return (
        <div className="popup-overlay">
            <div className="popup-box">
                <form onSubmit={handleSubmit}>
                    <input
                        className="input-title"
                        type="text"
                        value={inputTitle}
                        onChange={(e) => setInputTitle(e.target.value)}
                        spellCheck={false}
                        placeholder="Title"
                    />

                    <textarea
                        className="input-text"
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        spellCheck={false}
                        placeholder="What's on your mind..."
                    />

                    <div className="date-and-expand">
                            <div className="display-date">
                                {displayDate}
                            </div>

                            <div className="expand-button">
                                <img src={expandButton} alt="expand" />
                            </div>
                </div>

                </form>

            </div>

            <div className='okay-button' onClick={onClose}>
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
                        filter="url(#dropShadow)"   // shadow applied here
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
                <img src={tickmark} className='tick' />
            </div>

        </div>
    );
};
