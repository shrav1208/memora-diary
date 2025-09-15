import './Landing.css'
import { Navbar } from '../../components/Navbar';

export const Landing = () => {
    return (
        <>
        <Navbar />
        <div className="container">
            
            <button className="big-inviting-button">
                <p className='inner-text'>What's on your <span className='mind'>mind</span> today?</p>
                <p className='inner-subtitle'>Tap to start typing...</p>
            </button>
            <div className="or-divider">
                <div className="line"></div>
                <p className="or-text">or</p>
                <div className="line"></div>
            </div>
            <button className="go-to-dashboard">
                Go to my Dashboard
            </button>
        </div>
        </>
    );
}