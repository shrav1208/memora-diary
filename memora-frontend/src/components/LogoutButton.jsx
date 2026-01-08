import styles from './LogoutButton.module.css'
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';

export const LogoutButton = () => {

    const navigate = useNavigate();

    const { setUser } = useAuth();

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
            <button
                className={styles['logout-button']}
                onClick={handleLogout}
            >Logout</button>
        </>
    );
}