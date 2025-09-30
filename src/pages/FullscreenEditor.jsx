import React, { useState, useRef, useEffect } from "react";
import "./FullscreenEditor.css";
import tickmark from "../assets/tickmark.svg";
import dayjs from "dayjs";
import { Editor } from "@tinymce/tinymce-react";
import { Navbar } from "../components/Navbar";

// minor changes remaining - title input sizing errors during responsiveness

export const FullscreenEditor = () => {
    const [inputTitle, setInputTitle] = useState("");
    const [inputText, setInputText] = useState("");
    //   const [highlightColor, setHighlightColor] = useState("#FFFF00"); // default highlight
    const [activeHighlight, setActiveHighlight] = useState(null);
    // const [textColor, setTextColor] = useState("#343434"); // default text color
    const editorRef = useRef(null);

    const displayDate = dayjs().format("ddd, YYYY MMM D, H:mm A");

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
            <form className="fullscreen-editor-form">
                {/* Title + Date */}
                <div className="date-and-expand">
                    <textarea
                        ref={textareaRef}
                        className="input-title-fullscreen"
                        value={inputTitle}
                        onChange={(e) => setInputTitle(e.target.value)}
                        spellCheck={false}
                        placeholder="Title"
                    />
                    <div className="display-date">{displayDate}</div>
                </div>

                {/* TinyMCE Editor */}
                <Editor
                    className="editor-window"
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
                text-align: justify;
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
                <div className="custom-toolbar">
                    {/* Bold */}
                    <button type="button" onClick={() => runCommand("Bold")}>
                        <span className="toolbar-icon">B</span>
                    </button>

                    {/* Italic */}
                    <button type="button" onClick={() => runCommand("Italic")}>
                        <span className="toolbar-icon italic">I</span>
                    </button>

                    {/* Tick Button */}
                    <div className="okay-button">
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

                        <img src={tickmark} className="small-tick" alt="ok" />
                    </div>

                    {/* Underline */}
                    <button type="button" onClick={() => runCommand("Underline")}>
                        <span className="toolbar-icon underline">U</span>
                    </button>

                    {/* Text Color */}
                    {/* <div className="color-picker">
                        <button
                            type="button"
                            className="color-btn"
                            style={{ color: textColor }}
                        >
                            Aa
                        </button>
                        <div className="color-options">
                            {["#343434", "#FF595E", "#FFCA3A", "#8AC926", "#1982C4"].map(
                                (color) => (
                                    <span
                                        key={color}
                                        className="color-circle"
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
                    <div className="color-picker">
                        <button
                            type="button"
                            className="color-btn"
                            style={{
                                backgroundColor: activeHighlight || "transparent", // show selected highlight color
                            }}
                        >
                            <span className="highlight-btn">Aa</span>
                        </button>
                        <div className="color-options">
                            {["#fbf8cc", "#ffc8dd", "#bde0fe", "#d3fac7"].map((color) => (
                                <span
                                    key={color}
                                    className="color-circle"
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
            </form>
        </>
    );
};
