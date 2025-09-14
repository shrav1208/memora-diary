import './Login.css';
import { Link } from 'react-router';

export const Login = () => {
    return (
        <>
            <div className='container'>
                <div className='logo-name-tagline'>
                    <div className='logo-name'>
                        <div className='logo-image'></div>
                        <p className='heading-memora'>memora</p>
                    </div>

                    <p className='subtitle'>a diary that listens</p>
                </div>

                <div className='input-fields'>
                    <input type="text" className='input' placeholder='Enter username' />
                    <input type="text" className='input' placeholder='Enter password' />
                    <label className='remember-checkbox'>
                        <input id='remember-check' type="checkbox" />
                        <span class="checkmark"></span>
                        Remember me
                    </label>
                    <button className='login-button'>Login</button>
                    <p className='link-to-signup-p'>Click here to <Link to='/signup'>Sign up</Link></p>
                </div>
            </div>
        </>
    )
}