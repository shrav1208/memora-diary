import React, { useState, useRef, useEffect } from "react";
import styles from './FullscreenEditor.module.css';
import tickmark from "../assets/tickmark.svg";
import dayjs from "dayjs";
import { Editor } from "@tinymce/tinymce-react";
import { Navbar } from "../components/Navbar";
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import axios from "axios";

// minor changes remaining - title input sizing errors during responsiveness

export const FullscreenEditor = () => {

    const navigate = useNavigate();
    const [saving, setSaving] = useState(false);
    const [entryDate, setEntryDate] = useState(dayjs());


    const location = useLocation();

    const { id: entryid } = useParams();

    const initialTitle = location.state?.title || "";
    const initialContent = location.state?.content || "";

    const [inputTitle, setInputTitle] = useState(initialTitle);
    const [inputText, setInputText] = useState(initialContent);

    //   const [highlightColor, setHighlightColor] = useState("#FFFF00"); // default highlight
    const [activeHighlight, setActiveHighlight] = useState(null);
    // const [textColor, setTextColor] = useState("#343434"); // default text color
    const editorRef = useRef(null);

    const displayDate = entryDate.format("ddd, YYYY MMM D, H:mm A");

    useEffect(() => {
        if (!entryid) return;

        (async () => {
            try {
                const res = await axios.get(`/api/get/post/${entryid}`);
                setInputTitle(res.data.title);
                setInputText(res.data.content);
                setEntryDate(dayjs(res.data.createdAt));
            } catch (err) {
                console.error("Failed to fetch entry", err);
                alert("Failed to load diary entry");

                navigate(-1);
            }
        })();
    }, [entryid, navigate]);


    const handleSaveEntry = async () => {
        if (!inputText.trim()) {
            alert("Diary entry cannot be empty");
            return;
        }

        try {
            setSaving(true);

            if (entryid) {
                await axios.patch(`/api/update/post/${entryid}`, {
                    title: inputTitle.trim(),
                    content: inputText,
                })

            }
            else {
                await axios.post("/api/create/post", {
                    title: inputTitle.trim(),
                    content: inputText, // TinyMCE gives HTML — perfect
                }
                );

                // Navigate only AFTER successful save

            }
            navigate(-1);

        } catch (err) {
            console.error("Failed to save diary entry:", err);
            alert(err.response?.data?.message || "Failed to save entry");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        // If entry is not saved yet, just exit editor
        if (!entryid) {
            navigate(-1);
            return;
        }

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this diary entry?"
        );

        if (!confirmDelete) return;

        try {
            await axios.delete(`/api/delete/post/${entryid}`,
                { withCredentials: true });
            navigate(-1);
        } catch (err) {
            console.error("Delete failed:", err);
            alert(err.response?.data?.message || "Failed to delete entry");
        }
    };


    // function to run editor commands
    const runCommand = (cmd, value = null) => {
        if (editorRef.current) {
            editorRef.current.execCommand(cmd, false, value);
        }
    };

    const textareaRef = useRef(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto"; // reset
            textareaRef.current.style.height = textareaRef.current.scrollHeight + "px"; // grow
        }
    }, [inputTitle]);


    return (
        <>
            <Navbar />
            <form className={styles['fullscreen-editor-form']}>
                {/* Title + Date */}
                <div className={styles['date-and-expand']}>
                    <textarea
                        ref={textareaRef}
                        className={styles['input-title-fullscreen']}
                        value={inputTitle}
                        onChange={(e) => setInputTitle(e.target.value)}
                        spellCheck={false}
                        placeholder="Title"
                    />
                    <div className={styles['display-date']}>{displayDate}</div>
                </div>

                {/* TinyMCE Editor */}
                <Editor
                    className={styles['editor-window']}
                    apiKey="twu50nbcj9x9ly69juc4gl9ivr7mag5fn1lqhu76eviqufnq"
                    value={inputText}
                    onInit={(evt, editor) => (editorRef.current = editor)}
                    onEditorChange={(newValue) => setInputText(newValue)}
                    init={{
                        inline: true,
                        menubar: false,
                        toolbar: false,
                        branding: false,
                        statusbar: false,
                        placeholder: "Pour your heart out here...",
                        plugins: "lists link code",
                        content_style: `
                                        body {
                                            font-family: 'Inter', sans-serif;
                                            text-align: left;
                                            font-size: 24px;
                                            font-style: normal;
                                            font-weight: 300;
                                            line-height: normal;
                                            outline: none !important;
                                            border: none !important;
                                            box-shadow: none !important;
                                        }
                                        `,
                    }}
                />

                {/* Custom Toolbar */}
                <div className={styles['custom-toolbar']}>
                    {/* Bold */}
                    <button type="button" onClick={() => runCommand("Bold")}>
                        <span className={styles['toolbar-icon']}>B</span>
                    </button>

                    {/* Italic */}
                    <button type="button" onClick={() => runCommand("Italic")}>
                        <span className={styles['toolbar-icon italic']}>I</span>
                    </button>

                    {/* Tick Button */}
                    <div
                        className={styles['okay-button']}
                        onClick={handleSaveEntry}
                        style={{ opacity: saving ? 0.6 : 1, pointerEvents: saving ? "none" : "auto" }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="68"
                            height="68"
                            viewBox="0 0 68 68"
                            fill="none"
                            overflow="visible"
                        >
                            <circle
                                cx="34"
                                cy="34"
                                r="34"
                                fill="url(#paint0_linear_269_3564)"
                                stroke="url(#paint1_linear_269_3564)"
                                strokeWidth="3"
                                filter="url(#dropShadow)"
                            />

                            <defs>
                                <filter id="dropShadow" x="-50%" y="-50%" width="200%" height="200%">
                                    <feDropShadow
                                        dx="0"
                                        dy="2"
                                        stdDeviation="3.5"
                                        floodColor="black"
                                        floodOpacity="0.25"
                                    />
                                </filter>

                                <linearGradient
                                    id="paint0_linear_269_3564"
                                    x1="28" y1="-1.78894e-06" x2="57.3822" y2="26.4977"
                                    gradientUnits="userSpaceOnUse"
                                >
                                    <stop stopColor="#94DDFF" />
                                    <stop offset="1" stopColor="#DBF4FF" />
                                </linearGradient>

                                <linearGradient
                                    id="paint1_linear_269_3564"
                                    x1="15.5172"
                                    y1="29.4828"
                                    x2="15"
                                    y2="-6.98276"
                                    gradientUnits="userSpaceOnUse"
                                >
                                    <stop stopColor="#92DCFF" />
                                    <stop offset="1" stopColor="#EEFAFF" />
                                </linearGradient>
                            </defs>
                        </svg>

                        <img src={tickmark} className={styles['small-tick']} alt="ok" />
                    </div>

                    {/* Underline */}
                    <button type="button" onClick={() => runCommand("Underline")}>
                        <span className={styles['toolbar-icon underline']}>U</span>
                    </button>

                    {/* Text Color */}
                    {/* <div className={styles['color-picker']}>
                        <button
                            type="button"
                            className={styles['color-btn']}
                            style={{ color: textColor }}
                        >
                            Aa
                        </button>
                        <div className={styles['color-options']}>
                            {["#343434", "#FF595E", "#FFCA3A", "#8AC926", "#1982C4"].map(
                                (color) => (
                                    <span
                                        key={color}
                                        className={styles['color-circle']}
                                        style={{ backgroundColor: color }}
                                        onClick={() => {
                                            setTextColor(color);
                                            runCommand("ForeColor", color);
                                        }}
                                    />
                                )
                            )}
                        </div>
                    </div> */}

                    {/* Highlight Color */}
                    <div className={styles['color-picker']}>
                        <button
                            type="button"
                            className={styles['color-btn']}
                            style={{
                                backgroundColor: activeHighlight || "transparent", // show selected highlight color
                            }}
                        >
                            <span className={styles['highlight-btn']}>Aa</span>
                        </button>
                        <div className={styles['color-options']}>
                            {["#fbf8cc", "#ffc8dd", "#bde0fe", "#d3fac7"].map((color) => (
                                <span
                                    key={color}
                                    className={styles['color-circle']}
                                    style={{ backgroundColor: color }}
                                    onClick={() => {
                                        if (activeHighlight === color) {
                                            // if same color clicked again, reset
                                            runCommand("RemoveFormat"); // removes highlight
                                            setActiveHighlight(null);
                                        } else {
                                            // apply new highlight
                                            runCommand("BackColor", color);
                                            setActiveHighlight(color);
                                        }
                                    }}
                                />
                            ))}
                        </div>
                    </div>


                </div>

                <div className={styles['delete-button']} onClick={() => handleDelete()}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="19"
                        height="21"
                        viewBox="0 0 19 21"
                        fill="none"
                    >
                        <path
                            d="M8.17823 8.1778H6.13379V16.3556H8.17823V8.1778Z"
                            fill="#343434"
                        />
                        <path
                            d="M12.2671 8.1778H10.2227V16.3556H12.2671V8.1778Z"
                            fill="#343434"
                        />
                        <path
                            d="M18.4 4.08889H14.3111V2.04444C14.3111 0.92 13.3911 0 12.2667 0H6.13333C5.00889 0 4.08889 0.92 4.08889 2.04444V4.08889H0V6.13333H2.04444V18.4C2.04444 19.5244 2.96444 20.4444 4.08889 20.4444H14.3111C15.4356 20.4444 16.3556 19.5244 16.3556 18.4V6.13333H18.4V4.08889ZM6.13333 2.04444H12.2667V4.08889H6.13333V2.04444ZM14.3111 18.4H4.08889V6.13333H6.13333H12.2667H14.3111V18.4Z"
                            fill="#343434"
                        />
                    </svg>
                </div>
            </form>
        </>
    );
};
