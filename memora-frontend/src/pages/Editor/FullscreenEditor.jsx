import React, { useState, useRef, useEffect } from "react";
import styles from './FullscreenEditor.module.css';
import dayjs from "dayjs";
import { Editor } from "@tinymce/tinymce-react";
import { Navbar } from "../../components/Navbar";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';
import EditorToolbar from "./EditorToolbar"
import toast from 'react-hot-toast';
import { ConfirmModal } from '../../components/ConfirmModal';
import api from "../../utils/api";

// minor changes remaining - title input sizing errors during responsiveness

export const FullscreenEditor = () => {

    const navigate = useNavigate();
    const [saving, setSaving] = useState(false);
    const [entryDate, setEntryDate] = useState(dayjs());
    const [editor, setEditor] = useState(null)
    const [showConfirm, setShowConfirm] = useState(false);
    const [reflection, setReflection] = useState(null);
    const [showReflection, setShowReflection] = useState(false);

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
                const res = await api.get(`/api/get/post/${entryid}`);
                setInputTitle(res.data.title);
                setInputText(DOMPurify.sanitize(res.data.content));
                setEntryDate(dayjs(res.data.createdAt));
                setReflection(res.data.reflection);
            } catch (err) {
                console.error("Failed to fetch entry", err);
                toast.error("Failed to load diary entry");

                navigate(-1);
            }
        })();
    }, [entryid, navigate]);

    const handleSaveEntry = async () => {
        if (!inputText.trim()) {
            toast.error("Diary entry cannot be empty");
            return;
        }

        try {
            setSaving(true);

            if (entryid) {
                await api.patch(`/api/update/post/${entryid}`, {
                    title: inputTitle.trim(),
                    content: inputText,
                })

            }
            else {
                await api.post("/api/create/post", {
                    title: inputTitle.trim(),
                    content: inputText, // TinyMCE gives HTML — perfect
                }
                );

            }
            navigate(-1);
            toast.success("Memory safely locked away 🔒");

        } catch (err) {
            console.error("Failed to save diary entry:", err);
            toast.error(err.response?.data?.message || "Failed to save entry");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = () => {
    if (!entryid) {
        navigate(-1);
        return;
    }
    setShowConfirm(true);
};

const confirmDelete = async () => {
    setShowConfirm(false);
    try {
        await api.delete(`/api/delete/post/${entryid}`);
        navigate(-1);
    } catch (err) {
        console.error("Delete failed:", err);
        toast.error(err.response?.data?.message || "Failed to delete entry");
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
                        maxLength={200}
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
                    hasReflection={!!reflection}
                    onToggleReflection={() => setShowReflection(!showReflection)}
                    isReflectionOpen={showReflection}
                />

                {/* Reflection Panel */}
                {showReflection && reflection && (
                    <div className={styles['reflection-panel']}>
                        <div className={styles['reflection-header']}>
                            <h3>{reflection.heading}</h3>
                            <button type="button" onClick={() => setShowReflection(false)}>×</button>
                        </div>
                        <p className={styles['reflection-body']}>{reflection.body}</p>
                        
                        {reflection.cbt && (
                            <div className={styles['cbt-box']}>
                                <span className={styles['cbt-tag']}>CBT Exercise</span>
                                <p className={styles['cbt-text']}>{reflection.cbt}</p>
                            </div>
                        )}
                    </div>
                )}

            </form>

            {showConfirm && (
                <ConfirmModal
                    message="Are you sure you want to delete this diary entry?"
                    onConfirm={confirmDelete}
                    onCancel={() => setShowConfirm(false)}
                />
            )}
        </>
    );
};
