import { useState } from "react"
import styles from "./EditorToolbar.module.css"

import {
    BoldIcon,
    ItalicIcon,
    UnderlineIcon,
    HighlightIcon,
    UndoIcon,
    RedoIcon
} from "./icons"

export default function EditorToolbar({ editor, handleSave, handleDelete, hasReflection, onToggleReflection, isReflectionOpen }) {

    const [showColors, setShowColors] = useState(false);

    if (!editor) return null;

    const run = cmd => editor.execCommand(cmd);

    const highlight = color => {
        editor.execCommand("HiliteColor", false, color);
        setShowColors(false);
    }

    return (

        <div className={styles.toolbar}>

            {/* Formatting */}
            <div className={styles.group}>

                <button type="button" className={styles.iconBtn} onClick={() => run("Bold")}>
                    <BoldIcon />
                </button>

                <button type="button" className={styles.iconBtn} onClick={() => run("Italic")}>
                    <ItalicIcon />
                </button>

                <button type="button" className={styles.iconBtn} onClick={() => run("Underline")}>
                    <UnderlineIcon />
                </button>

            </div>

            <div className={styles.divider} />

            {/* Highlight */}
            <div className={styles.group}>

                <button
                    type="button"
                    className={styles.iconBtn}
                    onClick={() => setShowColors(!showColors)}
                >
                    <HighlightIcon />
                </button>

                {showColors && (
                    <div className={styles.colorPalette}>

                        <div className={styles.color} style={{ background: "#fff59d" }} onClick={() => highlight("#fff59d")} />
                        <div className={styles.color} style={{ background: "#a5d6a7" }} onClick={() => highlight("#a5d6a7")} />
                        <div className={styles.color} style={{ background: "#90caf9" }} onClick={() => highlight("#90caf9")} />
                        <div className={styles.color} style={{ background: "#ce93d8" }} onClick={() => highlight("#ce93d8")} />
                        <div className={styles.color} style={{ background: "#ef9a9a" }} onClick={() => highlight("#ef9a9a")} />

                    </div>
                )}

            </div>

            <div className={styles.divider} />

            {/* Undo / Redo */}
            <div className={styles.group}>

                <button type="button" className={styles.iconBtn} onClick={() => run("Undo")}>
                    <UndoIcon />
                </button>

                <button type="button" className={styles.iconBtn} onClick={() => run("Redo")}>
                    <RedoIcon />
                </button>

            </div>


            {/* Save */}
            <button type="button" className={`${styles.actionBtn} ${styles.saveBtn}`} onClick={handleSave}>
                Save
            </button>

            {/* Delete */}
            <button
                type="button"
                className={`${styles.actionBtn} ${styles.deleteBtn}`}
                onClick={handleDelete}
            >
                Delete
            </button>

        </div>
    )
}