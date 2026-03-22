import styles from './LogoutButton.module.css'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

export const LogoutButton = () => {

    const navigate = useNavigate();

    const { setUser } = useAuth();

    const handleLogout = async () => {
        try {
            await api.post('/api/logout');
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