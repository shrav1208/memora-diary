import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import styles from './QuoteCard.module.css';
import axios from 'axios';

export const QuoteCard = ({ refreshKey }) => {
    const [reflection, setReflection] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const fetchReflection = async () => {
            try {
                const res = await axios.get("/api/get/today-reflection", {
                    withCredentials: true
                });
                setReflection(res.data?.reflection);
            } catch (err) {
                console.error("Failed to fetch reflection:", err);
                // fallback content already handles null reflection
            }
        };
        fetchReflection();
    }, [refreshKey]);

    const heading = reflection?.heading || "Keep Moving Forward";
    const body = reflection?.body ||
        "Life is rarely a straight road; there will be obstacles, delays, and unexpected turns. What matters is that you keep moving, even if your steps are small. Progress is progress, and every little effort compounds over time into something meaningful.";

    return (
        <>
            {/* ── preview card ── */}
            <div
                className={styles['quote-card']}
                onClick={() => setIsOpen(true)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setIsOpen(true)}
            >
                <p className={styles['quote-heading']}>{heading}</p>
                <div className={styles['quote-outer']}>
                    <p className={styles['quote']}>{body}</p>
                </div>
            </div>

            {/* ── portal: renders directly in <body>, escapes all stacking contexts ── */}
            {createPortal(
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            className={styles['popup-overlay']}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => setIsOpen(false)}
                        >
                            <motion.div
                                className={styles['popup-box']}
                                onClick={(e) => e.stopPropagation()}
                                initial={{ opacity: 0, scale: 0.96, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.96, y: 10 }}
                                transition={{ duration: 0.25, ease: 'easeOut' }}
                            >
                                <p className={styles['popup-heading']}>{heading}</p>
                                <p className={styles['popup-body']}>{body}</p>
                                <button
                                    className={styles['close-button']}
                                    onClick={() => setIsOpen(false)}
                                >
                                    Back to my diary
                                </button>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </>
    );
};