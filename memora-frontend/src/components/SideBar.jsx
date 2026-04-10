import styles from './SideBar.module.css'
import profile from '../assets/profile-photo.png';
import { useEffect, useState } from 'react';
import { LogoutButton } from './LogoutButton';
import { Link } from 'react-router-dom';
import api from '../utils/api';

export const SideBar = () => {

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [profilePhoto, setProfilePhoto] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const res = await api.get('/api/read/user');

                const user = res.data.user;

                setName(user.name);
                setUsername(user.username);
                setProfilePhoto(user.profilePhoto); // 🔥 NEW

            } catch (err) {
                console.error(err.message);
            }
        })();
    }, []);

    return (
        <>
            <div className={styles['container']} style={{ opacity: name ? 1 : 0, transition: 'opacity 0.4s ease' }}>
                <div className={styles['user-information']}>

                    <img
                        src={profilePhoto || profile} // 🔥 fallback to default
                        onError={(e) => e.target.src = profile}
                        className={styles['user-profile-photo']}
                        alt='profile-photo'
                    />

                    <div className={styles['info']}>
                        <p className={styles['name']}>{name}</p>
                        <p className={styles['username']}>@{username}</p>
                    </div>
                </div>

                <div className={styles['paths-section']}>
                    <Link to='/profile'><button className={styles['profile-settings-button']}>Profile Settings</button></Link>
                    <LogoutButton />
                </div>

            </div>

        </>
    );
}