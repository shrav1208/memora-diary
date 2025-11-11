import { useEffect } from 'react';
import styles from './Login.module.css';
import { Link } from 'react-router';

export const Login = () => {
      useEffect(() => {
    document.body.className = 'login-body';
    return () => {
      document.body.className = ''; // cleanup when leaving page
    };
  }, []);
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

                <div className={styles['input-fields']}>
                    <input type="text" className={styles['input']} placeholder='Enter username' />
                    <input type="text" className={styles['input']} placeholder='Enter password' />
                    <label className={styles['remember-checkbox']}>
                        <input id={styles['remember-check']} type="checkbox" />
                        <span className={styles['checkmark']}></span>
                        Remember me
                    </label>
                    <button className={styles['login-button']}>Login</button>
                    <p className={styles['link-to-signup-p']}>Click here to <Link to='/signup'>Sign up</Link></p>
                </div>
            </div>
        </>
    )
}