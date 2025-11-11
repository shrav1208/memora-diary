import styles from './Navbar.module.css'

import logo from '../assets/navbar-logo.png';
import profile from '../assets/profile-photo.png';

export const Navbar = () => {
    return (
        <div className={styles['navbar-container']}>
            <div className={styles['navbar-path']}> 
                <div className={styles['logo-name-nav']}>
                    <img src={logo} className={styles['logo']} alt="profile"/>
                    <h6 className={styles['heading']}>memora</h6>
                </div>
                
            </div>

            <div className={styles['navbar-links']}>
                <p className={styles['navlink']}>Theme</p>
                <p className={styles['navlink']}>About</p>
                <p className={styles['navlink']}>Talk AI</p>
                <img src={profile} className={styles['profile-photo']} alt="profile"/>
            </div>
        </div>
    );
}