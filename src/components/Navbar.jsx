import './Navbar.css'

import logo from '../assets/navbar-logo.png';
import profile from '../assets/profile-photo.png';

export const Navbar = () => {
    return (
        <div className="navbar-container">
            <div className="navbar-path"> 
                <div className="logo-name">
                    <img src={logo} className='logo' alt="profile"/>
                    <h6 className="heading">memora</h6>
                </div>
                
            </div>

            <div className="navbar-links">
                <p className="navlink">Theme</p>
                <p className="navlink">About</p>
                <p className="navlink">Talk AI</p>
                <img src={profile} className='profile-photo' alt="profile"/>
            </div>
        </div>
    );
}