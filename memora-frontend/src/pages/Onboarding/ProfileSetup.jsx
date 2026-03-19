import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './ProfileSetup.module.css';
import defaultAvatar from '../../assets/profile-photo-large.png';
import { useAuth } from "../../context/AuthContext";

export const ProfileSetup = () => {

    const { user, setUser } = useAuth();
    const navigate = useNavigate();

    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [profilePreview, setProfilePreview] = useState(defaultAvatar);

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = () => setProfilePreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async () => {
        try {

            await axios.post("/api/profile/setup", {
                age,
                gender
            });

            setUser({
                ...user,
                profileCompleted: true
            });

            navigate("/landing", { replace: true });

        } catch (err) {
            alert("Error saving profile: " + err);
        }
    };

    return (

        <div className={styles.page}>

            {/* LEFT BRANDING */}

            <div className={styles.brandSection}>

                <div className={styles.logoNameTagline}>

                    <div className={styles.logoName}>

                        <div className={styles.logoImage}></div>

                        <p className={styles.headingMemora}>
                            memora
                        </p>

                    </div>

                    <p className={styles.subtitle}>
                        a diary that listens
                    </p>

                </div>

            </div>


            {/* RIGHT ONBOARDING CARD */}

            <div className={styles.cardSection}>

                <div className={styles.card}>

                    <p className={styles.profileHeading}>
                        Complete Profile
                    </p>

                    {/* Photo */}

                    <div className={styles.photoSection}>

                        <label htmlFor="profile-upload">

                            <img
                                className={styles.profilePhoto}
                                src={profilePreview}
                                alt="profile preview"
                                onError={() => setProfilePreview(defaultAvatar)}
                            />

                        </label>

                        <input
                            id="profile-upload"
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={handleImageChange}
                        />

                    </div>


                    {/* Age */}

                    <div className={styles.field}>

                        <label>Age</label>

                        <input
                            className={styles.input}
                            type="number"
                            min="0"
                            max="120"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                        />

                    </div>


                    {/* Gender */}

                    <div className={styles.field}>

                        <label>Gender</label>

                        <div className={styles.genderRow}>

                            <button
                                className={`${styles.genderBtn} ${gender === 'male' ? styles.active : ''}`}
                                onClick={() => setGender('male')}
                            >
                                Male
                            </button>

                            <button
                                className={`${styles.genderBtn} ${gender === 'female' ? styles.active : ''}`}
                                onClick={() => setGender('female')}
                            >
                                Female
                            </button>

                            <button
                                className={`${styles.genderBtn} ${gender === 'other' ? styles.active : ''}`}
                                onClick={() => setGender('other')}
                            >
                                Other
                            </button>

                        </div>

                    </div>


                    {/* Button */}

                    <button
                        className={styles.doneButton}
                        onClick={handleSubmit}
                        disabled={!age || !gender}
                    >
                        Continue
                    </button>

                </div>

            </div>

        </div>

    );
};