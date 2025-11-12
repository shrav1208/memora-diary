import styles from './Navbar.module.css'

import logo from '../assets/navbar-logo.png';
import profile from '../assets/profile-photo.png';
import { Link } from 'react-router';

export const Navbar = () => {
    return (
        <div className={styles['navbar-container']}>
            <div className={styles['navbar-path']}>
                <Link to='/year'>
                    <div className={styles['logo-name-nav']}>
                        <img src={logo} className={styles['logo']} alt="profile" />
                        <h6 className={styles['heading']}>memora</h6>
                    </div>
                </Link>
                {/* dynamically changing path here */}
                
            </div>

            <div className={styles['navbar-links']}>
                <p className={styles['navlink']}>Theme</p>
                 <Link to='/about'><p className={styles['navlink']}>About</p></Link>
                <p className={styles['navlink']}>Talk AI</p>
                 <Link to='/profile'><img src={profile} className={styles['profile-photo']} alt="profile" /></Link>
            </div>
        </div>
    );
}