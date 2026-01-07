import styles from './SideBar.module.css'
import profile from '../assets/profile-photo.png';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { LogoutButton } from './LogoutButton';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';

export const SideBar = () => {

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');

    const navigate = useNavigate();
    const { setUser } = useAuth();

    useEffect(() => {
        (
            async () => {
                try {
                    const res = await axios.get('/api/dashboard', { withCredentials: true });
                    console.log(res);
                    setName(res.data.user.name);
                    setUsername(res.data.username.username);

                } catch (err) {
                    console.error(err.message);
                }
            })();
    }, []);

    const handleLogout = async () => {
        try {
            await axios.post('/api/logout', {}, { withCredentials: true });
            setUser(null);
            navigate('/login', { replace: true });
        } catch (err) {
            console.error("Logout failed:", err);
        }
    };

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
                    <LogoutButton onClick={handleLogout} />
                </div>

            </div>

        </>
    );
}