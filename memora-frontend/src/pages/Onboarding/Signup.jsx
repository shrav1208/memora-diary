import { useEffect, useState } from 'react';
import styles from './Signup.module.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import show from "../../assets/show.png";
import hide from "../../assets/hide.png";
import { useAuth } from '../../context/AuthContext';


export const Signup = () => {

    const navigate = useNavigate();
    const { setUser } = useAuth();

    // form states
    const [newUsernameInput, setNewUsernameInput] = useState('');
    const [nameInput, setNameInput] = useState('');
    const [createPasswordInput, setCreatePasswordInput] = useState('');
    const [confirmPasswordInput, setConfirmPasswordInput] = useState('');

    // validation state
    const [passwordError, setPasswordError] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    // confirm password validation
    useEffect(() => {
        if (!createPasswordInput || !confirmPasswordInput) {
            setPasswordError('');
            return;
        }

        if (createPasswordInput != confirmPasswordInput) {
            setPasswordError('Passwords do not match :(');
        } else {
            setPasswordError('');
        }
    }, [createPasswordInput, confirmPasswordInput]);

    function saveUsernameInput(event) {
        setNewUsernameInput(event.target.value);
    }

    function savePasswordInput(event) {
        setCreatePasswordInput(event.target.value);
    }

    function saveNameInput(event) {
        setNameInput(event.target.value);
    }

    function savePassConfirmInput(event) {
        setConfirmPasswordInput(event.target.value);
    }

    async function sendCredentials(event) {

        event.preventDefault();

        // final guard before API call
        if (passwordError) return;

        try {
            const res = await axios.post('/api/signup', {
                username: newUsernameInput,
                password: createPasswordInput,
                name: nameInput,
            });
            // console.log(res.data)
            if (res.data.success) {
                setNewUsernameInput('');
                setNameInput('');
                setCreatePasswordInput('');
                setConfirmPasswordInput('');
                
                const meRes = await axios.get("/api/auth/me");
                setUser(meRes.data.user);
                navigate("/landing", { replace: true });
            }
        } catch (err) {
            if (err.response) {
                alert(err.response.data.message);
            }
            else {
                console.log(err);
                alert("Server error");
            }
        }
    }

    return (
        <>
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
                        value={newUsernameInput}
                    />

                    <input
                        type="text"
                        className={styles['input']}
                        placeholder='Enter first name'
                        onChange={saveNameInput}
                        value={nameInput}
                    />

                    <div className={styles['password-input']}> 
                        <input
                            type={showPassword ? "text" : "password"}
                            className={styles['input']}
                            placeholder='Enter password'
                            onChange={savePasswordInput}
                            value={createPasswordInput}
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className={styles['show-hide']}
                            
                        >
                            {showPassword ? <img src={hide} className={styles['show-hide-icons']} /> : <img src={show} className={styles['show-hide-icons']} />}
                        </button>
                    </div>

                    <div className={styles['password-input']}>

                        <input
                            type={showConfirm ? "text" : "password"}
                            className={styles['input']}
                            placeholder='Confirm password'
                            onChange={savePassConfirmInput}
                            value={confirmPasswordInput}
                        />

                        <button
                            type="button"
                            onClick={() => setShowConfirm(!showConfirm)}
                            className={styles['show-hide']}
                        >
                            {showConfirm ? <img src={hide} className={styles['show-hide-icons']} /> : <img src={show} className={styles['show-hide-icons']} />}
                        </button>
                    </div>

                    {passwordError && (
                        <p className={styles['error-text']}>{passwordError}</p>
                    )}

                    <label className={styles['remember-checkbox']}>
                        <input id={styles['remember-check']} type="checkbox" />
                        <span className={styles['checkmark']}></span>
                        Remember me
                    </label>

                    <button
                        type="submit"
                        className={styles['login-button']}
                        disabled={
                            !newUsernameInput ||
                            !createPasswordInput ||
                            !confirmPasswordInput ||
                            passwordError
                        }
                    >Sign up

                    </button>
                    {/* disables button if username or password is missing, OR password mismatch occurs */}

                    <p className={styles['link-to-signup-p']}>Click here to <Link to='/login'>Login</Link></p>

                </form>
            </div>
        </>
    )
}