import styles from './Navbar.module.css'
import sidebar from '../assets/sidebar.png'
import logo from '../assets/navbar-logo.png';
import { Link } from 'react-router-dom';
import { SideBar } from './SideBar';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

export const Navbar = () => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const sidebarRef = useRef(null);

    const navigate = useNavigate();

    const goToDashboard = () => {
        const year = dayjs().year();
        navigate(`/dashboard/${year}`);
    };

    // Fade in bg on scroll
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close sidebar on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                isSidebarOpen &&
                sidebarRef.current &&
                !sidebarRef.current.contains(e.target)
            ) {
                setIsSidebarOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isSidebarOpen]);

    return (
        <>
            <div className={`${styles['navbar-container']} ${isScrolled ? styles['scrolled'] : ''}`}>
                <div className={styles['navbar-inner']}>
                    <div className={styles['navbar-path']}>
                        <div className={styles['logo-name-nav']} onClick={goToDashboard}>
                            <img src={logo} className={styles['logo']} alt="profile" />
                            <h6 className={styles['heading']}>memora</h6>
                        </div>
                    </div>

                    <img src={sidebar} className={styles['sidebar']} alt='sidebar' onClick={() => setIsSidebarOpen(prev => !prev)} />
                </div>
            </div>
            {isSidebarOpen && (
                <div ref={sidebarRef} className={styles['sidebar-wrapper']}>
                    <SideBar />
                </div>
            )}
        </>
    );
}