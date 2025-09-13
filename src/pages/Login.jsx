import './Login.css';

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
                    <button className='login-button'>Login</button>
                </div>
            </div>
        </>
    )
}