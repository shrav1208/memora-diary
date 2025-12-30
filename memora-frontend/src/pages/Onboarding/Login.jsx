import { useEffect } from 'react';
import styles from './Login.module.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export const Login = () => {

    const navigate = useNavigate();

    useEffect(() => {
        document.body.className = 'login-body';
        return () => {
            document.body.className = ''; // cleanup when leaving page
        };
    }, []); 

    const [usernameInput, setUsernameInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');

    function saveUsernameInput(event){
        setUsernameInput(event.target.value);
    }

    function savePasswordInput(event){
        setPasswordInput(event.target.value);
    }

    async function sendCredentials(event){

        event.preventDefault();

        // if(usernameInput === '' || passwordInput === '') return
        
        // alert(`username: ${usernameInput} password: ${passwordInput}`)

        try{
            const res = await axios.post('/api/login', {
                username: usernameInput,
                password: passwordInput,
            });
            console.log(res.data)
            if(res.data.success){
                setUsernameInput('')
                setPasswordInput('')
                navigate("/landing", {replace: true});
            }
        }catch(err){
            if(err.response){
                alert(err.response.data.message)
            }
            else{
                console.log(err)
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
                        value={usernameInput}
                    />

                    <input 
                        type="password" 
                        className={styles['input']} 
                        placeholder='Enter password' 
                        onChange={savePasswordInput}
                        value={passwordInput}
                    />

                    <label className={styles['remember-checkbox']}>
                        <input id={styles['remember-check']} type="checkbox" />
                        <span className={styles['checkmark']}></span>
                        Remember me
                    </label>

                    <button 
                        type = "submit"
                        className={styles['login-button']}
                    >Login</button>

                    <p className={styles['link-to-signup-p']}>Click here to <Link to='/signup'>Sign up</Link></p>

                </form>
            </div>
        </>
    )
}