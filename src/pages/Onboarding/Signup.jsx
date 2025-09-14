import './Signup.css';
import { Link } from 'react-router';

export const Signup = () => {
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
                    <input type="text" className='input' placeholder='Confirm password' />
                    <label className='remember-checkbox'>
                        <input id='remember-check' type="checkbox" />
                        <span class="checkmark"></span>
                        Remember me
                    </label>
                    <button className='login-button'>Sign up</button>
                    <p className='link-to-signup-p'>Click here to <Link to='/login'>Login</Link></p>
                </div>
            </div>
        </>
    )
}