import { useState } from 'react';
import styles from './MoodInputPopup.module.css';
import star from '../../assets/star-icon.png';
import red from '../../assets/emotion-red.png';
import blue from '../../assets/emotion-blue.png';
import green from '../../assets/emotion-green.png';
import purple from '../../assets/emotion-purple.png';
import orange from '../../assets/emotion-orange.png';
import yellow from '../../assets/emotion-yellow.png';
import axios from 'axios';
import { motion, AnimatePresence } from "motion/react";
import { useEffect } from 'react';


export const MoodInputPopup = ({ isOpen, onClose, date = new Date() }) => {
    const [selectedMood, setSelectedMood] = useState(null);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!isOpen) return;

        (async () => {
            try {
                const res = await axios.get('/api/get/moods', { withCredentials: true });

                const todayEntry = res.data.result.find(entry => {
                    const entryDate = new Date(entry.date);
                    return entryDate.getDate() === date.getDate() &&
                           entryDate.getMonth() === date.getMonth() &&
                           entryDate.getFullYear() === date.getFullYear();
                });

                if (todayEntry?.manualMood) {
                    setSelectedMood(todayEntry.manualMood);
                } else {
                    setSelectedMood(null);
                }
            } catch (err) {
                console.error('Failed to fetch mood:', err);
            }
        })();
    }, [isOpen, date]);

    if (!isOpen) return null;

    const handleSaveMood = async () => {
        if (!selectedMood) {
            alert("Please select a mood");
            return;
        }

        try {
            setSaving(true);
            await axios.post(
                "/api/set/mood",
                { 
                    mood: selectedMood,
                    date: date.toISOString(), // send the specific date
                },
                { withCredentials: true }
            );
            onClose();
        } catch (err) {
            console.error(err);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className={styles['popup-overlay']} onClick={onClose}>
            <motion.div
                layout
                className={styles["mood-pop-up"]}
                onClick={(e) => e.stopPropagation()}
                transition={{ layout: { duration: 0.35, ease: "easeInOut" } }}
            >
                <motion.div layout className={styles["content"]}>
                    <div className={styles['upper-half']}>
                        <div className={styles['star-container']}>
                            <img src={star} className={styles['star']} alt='star' />
                        </div>
                        <p className={styles['heading']}>How are you feeling today?</p>
                    </div>

                    <div className={styles['moods-container']}>

                        <MoodButton
                            img={blue}
                            label="Sad"
                            value="sad"
                            selectedMood={selectedMood}
                            setSelectedMood={setSelectedMood}
                        />

                        <MoodButton
                            img={red}
                            label="Anxious"
                            value="anxious"
                            selectedMood={selectedMood}
                            setSelectedMood={setSelectedMood}
                        />

                        <MoodButton
                            img={green}
                            label="Neutral"
                            value="neutral"
                            selectedMood={selectedMood}
                            setSelectedMood={setSelectedMood}
                        />

                        <MoodButton
                            img={purple}
                            label="Calm"
                            value="calm"
                            selectedMood={selectedMood}
                            setSelectedMood={setSelectedMood}
                        />

                        <MoodButton
                            img={orange}
                            label="Happy"
                            value="happy"
                            selectedMood={selectedMood}
                            setSelectedMood={setSelectedMood}
                        />

                        <MoodButton
                            img={yellow}
                            label="Excited"
                            value="excited"
                            selectedMood={selectedMood}
                            setSelectedMood={setSelectedMood}
                        />
                    </div>
                </motion.div>

                {/* <button
                    className={`${styles['save-button']} ${selectedMood ? styles['save-visible'] : styles['save-hidden']}`}
                    onClick={handleSaveMood}
                    disabled={!selectedMood}
                >
                    Save Mood
                </button> */}
                <AnimatePresence>
                    {selectedMood && (
                        <motion.button
                            layout
                            onClick={handleSaveMood}
                            disabled={!selectedMood}
                            className={styles["save-button"]}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 12 }}
                        >
                            Save Mood
                        </motion.button>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

const MoodButton = ({ img, label, value, selectedMood, setSelectedMood }) => (
    <div className={styles['mood-choice']}>
        <button
            className={`${styles['mood-button']} ${selectedMood === value ? styles['selected'] : ''
                }`}
            onClick={() => setSelectedMood(value)}
        >
            <img src={img} className={styles['mood-img']} alt={label} />
        </button>
        <p>{label}</p>
    </div>
);
