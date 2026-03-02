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

    // Profile photo preview state
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

            // Update user locally
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
        <div className={styles.container}>
            <p className={styles['profile-heading']}>Complete Profile</p>
            <div className={styles.upper}>


                {/* Profile Photo Section */}
                <div className={styles['input-field-container']}>
                    <p className={styles['profile-photo-heading']}>Set Profile Photo</p>
                    <label htmlFor="profile-upload" className={styles['edit-photo']}>
                        <img
                            className={styles['profile-photo']}
                            src={profilePreview}
                            alt="profile preview"
                            onError={() => setProfilePreview(defaultAvatar)}
                        />
                    </label>

                    <input
                        id="profile-upload"
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleImageChange}
                    />

                    

                </div>
            </div>

            <div className={styles.lower}>
                <div className={styles['input-field-container']}>
                    <p>Set Age</p>
                    <input
                        className={styles.input}
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                    />
                </div>

                <div className={styles['input-field-container']}>
                    <p>Set Gender</p>
                    <input
                        className={styles.input}
                        type="text"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                    />
                </div>
            </div>

            <button
                className={styles['done-button']}
                onClick={handleSubmit}
                disabled={!age || !gender}
            >
                Done
            </button>
        </div>
    );
};

