import { useEffect, useState } from 'react';
import styles from './Signup.module.css';
import { Link } from 'react-router';

export const Signup = () => {
    useEffect(() => {
        document.body.className = 'signup-body';
        return () => {
            document.body.className = ''; // cleanup when leaving page
        };
    }, []);

    const [placeHolder, setPlaceHolder] = useState('');

    const placeholderFunction = () => {

    };

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

                <form className={styles['input-fields']} onSubmit={placeholderFunction}>
                
                                    <input 
                                        type="text" 
                                        className={styles['input']} 
                                        placeholder='Enter username' 
                                        onChange={placeholderFunction}
                                        value={placeHolder}
                                    />

                                    <input 
                                        type="text" 
                                        className={styles['input']} 
                                        placeholder='Enter first name' 
                                        onChange={placeholderFunction}
                                        value={placeHolder}
                                    />
                
                                    <input 
                                        type="password" 
                                        className={styles['input']} 
                                        placeholder='Enter password' 
                                        onChange={placeholderFunction}
                                        value={placeHolder}
                                    />

                                    <input 
                                        type="password" 
                                        className={styles['input']} 
                                        placeholder='Confirm password' 
                                        onChange={placeholderFunction}
                                        value={placeHolder}
                                    />
                
                                    <label className={styles['remember-checkbox']}>
                                        <input id={styles['remember-check']} type="checkbox" />
                                        <span className={styles['checkmark']}></span>
                                        Remember me
                                    </label>
                
                                    <button 
                                        type = "submit"
                                        className={styles['login-button']}
                                    >Sign up</button>
                
                                    <p className={styles['link-to-signup-p']}>Click here to <Link to='/login'>Login</Link></p>
                
                                </form>
            </div>
        </>
    )
}