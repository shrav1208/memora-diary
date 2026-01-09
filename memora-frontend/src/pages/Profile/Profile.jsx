import { Navbar } from '../../components/Navbar';
import styles from './Profile.module.css'
import backButton from '../../assets/back-button.svg'
import profileShrav from '../../assets/profile-photo-shrav.jpeg'
import cameraIcon from '../../assets/camera-icon.svg'

export const Profile = () => {

    return (
        <>
            {/* change the input types for each input field. to be done later */}
            <Navbar />
            <div className={styles['back-button']}>
                <img src={backButton} alt='back button' />
            </div>
            <div className={styles['container']}>
                <div className={styles['content-container']}>
                    <p className={styles['profile-heading']}>My Profile</p>

                    <div className={styles['info-box']}>
                        <div className={styles['profile-input-fields']}>

                            <p>Personal Information</p>
                            <div className={styles['inputs']}>

                                <div className={styles['vertical-inputs']}>
                                    <div className={styles['input-section']}>
                                        <p>Username</p>
                                        <input className={styles['input-vertical']} type='text' placeholder='shravberri' />
                                    </div>
                                    <div className={styles['input-section']}>
                                        <p>Name</p>
                                        <input className={styles['input-vertical']} type='text' placeholder='Shravani' />
                                    </div>
                                </div>
                                <div className={styles['horizontal-inputs']}>
                                    <div className={styles['input-section-horizontal']}>
                                        <p>Age</p>
                                        <input className={styles['input-horizontal']} type='text' placeholder='21' />
                                    </div>
                                    <div className={styles['input-section-horizontal']}>
                                        <p>Gender</p>
                                        <input className={styles['input-horizontal']} type='text' placeholder='Female' />
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className={styles['profile-image-edit']}>
                            <img className={styles['profile-img']} src={profileShrav} alt='profile photo' />
                            <p><img src={cameraIcon} alt='camera icon' /> Edit</p>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}