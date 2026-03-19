import styles from './LogoutButton.module.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const LogoutButton = () => {

    const navigate = useNavigate();

    const { setUser } = useAuth();

    const handleLogout = async () => {
        try {
            await axios.post('/api/logout', {}, { withCredentials: true });
        } catch (err) {
            console.error("Logout failed:", err);
        } finally {
            setUser(null); // always clear, even if server call fails
            navigate('/login', { replace: true });
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