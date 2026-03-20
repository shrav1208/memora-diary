import styles from './Login.module.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import show from "../../assets/show.png";
import hide from "../../assets/hide.png";
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

export const Login = () => {

    const navigate = useNavigate();
    const { setUser } = useAuth();

    const [usernameInput, setUsernameInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    // ⭐ Remember me state
    const [rememberMe, setRememberMe] = useState(false);

    function saveUsernameInput(event) {
        setUsernameInput(event.target.value);
    }

    function savePasswordInput(event) {
        setPasswordInput(event.target.value);
    }

    async function sendCredentials(event) {

        event.preventDefault();

        try {
            const res = await axios.post('/api/login', {
                username: usernameInput,
                password: passwordInput,
                rememberMe: rememberMe
            }, { withCredentials: true });

            if (res.data.success) {

                setUsernameInput('');
                setPasswordInput('');

                const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
                await axios.post("/api/session/timezone", { timezone });

                const meRes = await axios.get("/api/auth", {
                    withCredentials: true
                });

                setUser(meRes.data.user);
                navigate("/landing", { replace: true });
            }

        } catch (err) {
            if (err.response) {
                toast.error(err.response.data.message);
            } else {
                console.error(err);
                toast.error("Server error");
            }
        }
    }

    return (
        <div className={styles['container']}>

            <div className={styles['logo-name-tagline']}>
                <div className={styles['logo-name']}>
                    <div className={styles['logo-image']}></div>
                    <p className={styles['heading-memora']}>memora</p>
                </div>

                <p className={styles['subtitle']}>a diary that listens</p>
            </div>

            <form className={styles['input-fields']} onSubmit={sendCredentials}>

                <input
                    type="text"
                    className={styles['input']}
                    placeholder='Enter username'
                    onChange={saveUsernameInput}
                    value={usernameInput}
                />

                <div className={styles['password-input']}>
                    <input
                        type={showPassword ? "text" : "password"}
                        className={styles['input']}
                        placeholder='Enter password'
                        onChange={savePasswordInput}
                        value={passwordInput}
                    />

                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className={styles['show-hide']}
                    >
                        {showPassword
                            ? <img src={hide} className={styles['show-hide-icons']} />
                            : <img src={show} className={styles['show-hide-icons']} />
                        }
                    </button>
                </div>

                {/* ⭐ Remember Me Checkbox */}
                <label className={styles['remember-checkbox']}>
                    <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <span className={styles['checkmark']}></span>
                    Remember me
                </label>

                <button
                    type="submit"
                    className={styles['login-button']}
                    disabled={!usernameInput || !passwordInput}
                >
                    Login
                </button>

                <p className={styles['link-to-signup-p']}>
                    Click here to <Link to='/signup'>Sign up</Link>
                </p>

            </form>
        </div>
    );
};