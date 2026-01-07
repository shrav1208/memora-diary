import styles from './Navbar.module.css'
import sidebar from '../assets/sidebar.png'
import logo from '../assets/navbar-logo.png';
import { Link } from 'react-router';
import { SideBar } from './SideBar';
import { useEffect, useRef, useState } from 'react';

export const Navbar = () => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const sidebarRef = useRef(null);

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
            <div className={styles['navbar-container']}>
                <div className={styles['navbar-inner']}>
                    <div className={styles['navbar-path']}>
                        <Link to='/dashboard/year'>
                            <div className={styles['logo-name-nav']}>
                                <img src={logo} className={styles['logo']} alt="profile" />
                                <h6 className={styles['heading']}>memora</h6>
                            </div>
                        </Link>
                        {/* dynamically changing path here */}

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