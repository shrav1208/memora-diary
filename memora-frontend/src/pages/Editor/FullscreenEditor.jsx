import React, { useState, useRef, useEffect } from "react";
import styles from './FullscreenEditor.module.css';
import dayjs from "dayjs";
import { Editor } from "@tinymce/tinymce-react";
import { Navbar } from "../../components/Navbar";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';
import EditorToolbar from "./EditorToolbar"

import axios from "axios";

// minor changes remaining - title input sizing errors during responsiveness

export const FullscreenEditor = () => {

    const navigate = useNavigate();
    const [saving, setSaving] = useState(false);
    const [entryDate, setEntryDate] = useState(dayjs());
    const [editor, setEditor] = useState(null)

    const location = useLocation();

    const { id: entryid } = useParams();

    const initialTitle = location.state?.title || "";
    const initialContent = location.state?.content || "";

    const [inputTitle, setInputTitle] = useState(initialTitle);
    const [inputText, setInputText] = useState(initialContent);

    const displayDate = entryDate.format("ddd, YYYY MMM D, H:mm A");

    useEffect(() => {
        if (!entryid) return;

        (async () => {
            try {
                const res = await axios.get(`/api/get/post/${entryid}`);
                setInputTitle(res.data.title);
                setInputText(DOMPurify.sanitize(res.data.content));
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
                <div className={styles["editor-window"]}>
                <Editor
                    className={styles['editor-window']}
                    apiKey={import.meta.env.VITE_TINYMCE_KEY} 
                    value={inputText}
                    onInit={(evt, ed) => setEditor(ed)}
                    onEditorChange={(newValue) => setInputText(newValue)}
                    init={{
                        inline: true,
                        menubar: false,
                        toolbar: false,
                        branding: false,
                        statusbar: false,
                        body_class: styles['editor-window'], 
                        placeholder: "Pour your heart out here...",
                        plugins: "lists link code",
                        content_style: `
                                        body {
                                            font-family: 'Inter', sans-serif;
                                            text-align: left;
                                            max-width: 100%;
                                            word-break: break-word;
                                            outline: none !important;
                                            border: none !important;
                                            box-shadow: none !important;
                                        }

                                        p, li, span, div {
                                            font-size: clamp(18px, 2.2vw, 24px) !important;
                                            line-height: 1.6;
                                        }
                                        `,
                    }}
                />
                </div>

                {/* Custom Toolbar */}
                <EditorToolbar
                    editor={editor}
                    handleSave={handleSaveEntry}
                    handleDelete={handleDelete}
                />

            </form>
        </>
    );
};
