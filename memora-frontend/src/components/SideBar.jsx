import styles from './SideBar.module.css'
import profile from '../assets/profile-photo.png';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { LogoutButton } from './LogoutButton';
import { Link } from 'react-router-dom';

export const SideBar = () => {

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');

    useEffect(() => {
        (
            async () => {
                try {
                    const res = await axios.get('/api/read/user', { withCredentials: true });
                    console.log(res);
                    setName(res.data.user.name);
                    setUsername(res.data.user.username);

                } catch (err) {
                    console.error(err.message);
                }
            })();
    }, []);

    

    return (
        <>
            <div className={styles['container']}>

                <div className={styles['user-information']}>

                    <img src={profile} className={styles['user-profile-photo']} alt='profile-photo' />

                    <div className={styles['info']}>
                        <p className={styles['name']}>{name}</p>
                        <p className={styles['username']}>@{username}</p>
                    </div>
                </div>

                <div className={styles['paths-section']}>
                    <Link to='/profile'><button className={styles['profile-settings-button']}>Profile Settings</button></Link>
                    <LogoutButton/>
                </div>

            </div>

        </>
    );
}