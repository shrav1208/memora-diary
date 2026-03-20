import React, { useState, useRef, useEffect } from "react";
import styles from './PopupInput.module.css';
import tickmark from '../assets/tickmark.svg';
import dayjs from "dayjs";
import expandButton from '../assets/expand.svg';
import { Link } from 'react-router-dom';
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import toast from 'react-hot-toast';

export const PopupInput = ({ isOpen, onClose, onSaved }) => {
    const [inputTitle, setInputTitle] = useState("");
    const [content, setContent] = useState("");
    const [saving, setSaving] = useState(false);

    const editorRef = useRef(null);

    const displayDate = dayjs().format('ddd, YYYY MMM D, H:mm A');

    const handleSaveEntry = async () => {
        const textOnly = content.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, "").trim();
        if (!textOnly) {
            toast.error("Diary entry cannot be empty");
            return;
        }

        try {
            setSaving(true);

            await axios.post(
                "/api/create/post",
                {
                    title: inputTitle.trim(),
                    content,
                },
                { withCredentials: true }
            );

            setInputTitle("");
            setContent("");
            onSaved?.();
            onClose();

        } catch (err) {
            console.error("Failed to save diary entry:", err);
            toast.error(err.response?.data?.message || "Failed to save entry");
        } finally {
            setSaving(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className={styles['popup-overlay']} onClick={onClose}>
            <div className={styles['popup-box']} onClick={(e) => e.stopPropagation()}>
                <form>
                    <input
                        className={styles['input-title']}
                        type="text"
                        value={inputTitle}
                        onChange={(e) => setInputTitle(e.target.value)}
                        spellCheck={false}
                        placeholder="Title"
                        maxLength={200}
                    />

                    <div className={styles['input-text']}>
                        <Editor
                            className={styles['input-text']}
                            apiKey={import.meta.env.VITE_TINYMCE_KEY}
                            value={content}
                            onInit={(evt, editor) => {
                                editorRef.current = editor;

                                editor.on('NodeChange', () => {
                                    editor.selection.scrollIntoView();
                                });
                            }}
                            onEditorChange={setContent}
                            init={{
                                inline: true,
                                menubar: false,
                                toolbar: false,
                                branding: false,
                                statusbar: false,
                                body_class: styles['input-text'],
                                plugins: [],
                                placeholder: "What's on your mind...",
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
                                    overflow-y: auto !important;
                                    max-height: 300px;
                                    box-shadow: none !important;
                                }`,
                                setup: (editor) => {
                                    editor.on("keydown", (e) => {
                                        if ((e.ctrlKey || e.metaKey) && ["b", "i", "u"].includes(e.key.toLowerCase())) {
                                            e.preventDefault();
                                        }
                                    });
                                },
                            }}
                        />
                    </div>

                    <div className={styles['date-and-expand']}>
                        <div className={styles['display-date']}>{displayDate}</div>

                        <div className={styles['expand-button']}>
                            <Link
                                to="/fullscreen-editor"
                                state={{
                                    title: inputTitle,
                                    content: content
                                }}
                            >
                                <img src={expandButton} alt="expand" />
                            </Link>
                        </div>
                    </div>
                </form>
            </div>

            <div
                className={styles['okay-button']}
                onClick={(e) => {
                    e.stopPropagation();
                    if (!saving) handleSaveEntry();
                }}
                style={{
                    opacity: saving ? 0.6 : 1,
                    pointerEvents: saving ? "none" : "auto",
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="58"
                    height="58"
                    viewBox="0 0 58 58"
                    fill="none"
                    overflow="visible"
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

                    <circle
                        data-figma-bg-blur-radius="197.3"
                        cx="29"
                        cy="29"
                        r="27.5"
                        fill="url(#paint0_linear_265_3410)"
                        stroke="url(#paint1_linear_265_3410)"
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
                            x1="30"
                            y1="57"
                            x2="29"
                            y2="-13.5"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stopColor="#92DCFF" />
                            <stop offset="1" stopColor="#EEFAFF" />
                        </linearGradient>
                    </defs>
                </svg>

                <img src={tickmark} className={styles['tick']} alt="save" />
            </div>
        </div>
    );
};