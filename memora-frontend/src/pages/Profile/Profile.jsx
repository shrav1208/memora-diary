import { useState, useEffect } from 'react';
import { Navbar } from '../../components/Navbar';
import styles from './Profile.module.css';
import backButton from '../../assets/back-button.svg';
import cameraIcon from '../../assets/camera-icon.svg';
import defaultAvatar from '../../assets/profile-photo-large.png';
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import api from '../../utils/api';

export const Profile = () => {

    const [user, setUser] = useState(null);
    const [profilePreview, setProfilePreview] = useState(defaultAvatar);
    const [usernameEditable, setUsernameEditable] = useState(true);
    const [selectedFile, setSelectedFile] = useState(null);

    const navigate = useNavigate();

    // Fetch user from backend
    useEffect(() => {
        (async () => {
            try {
                const res = await api.get('/api/read/user');

                const fetchedUser = res.data.user;

                const validGenders = ['male', 'female', 'other'];

                setUser({
                    ...fetchedUser,
                    gender: validGenders.includes(
                        fetchedUser.gender?.toLowerCase()
                    )
                        ? fetchedUser.gender.toLowerCase()
                        : '',
                    usernameChanges: fetchedUser.usernameChanges || []
                });

                setProfilePreview(
                    fetchedUser.profilePhoto || defaultAvatar
                );

            } catch (err) {
                console.error(err);
            }
        })();
    }, []);

    // Username restriction logic
    useEffect(() => {
        if (!user?.usernameChanges) return;

        const now = Date.now();
        const twoWeeksAgo = now - 14 * 24 * 60 * 60 * 1000;

        const recentChanges = user.usernameChanges.filter(
            ts => ts > twoWeeksAgo
        );

        setUsernameEditable(recentChanges.length < 2);

    }, [user]);

    // Handle field changes
    const handleChange = (field, value) => {
        setUser(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // Username change
    const handleUsernameChange = (e) => {
        if (usernameEditable) {
            handleChange('username', e.target.value);
        }
    };

    // Image preview (frontend only)
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setSelectedFile(file); // 🔥 store actual file

        const reader = new FileReader();
        reader.onload = () => {
            setProfilePreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleSave = async () => {
    if (!user.username?.trim() || user.username.trim().length < 5) {
        toast.error("Username must be at least 5 characters");
        return;
    }
    if (user.username.trim().length > 15) {
        toast.error("Username must be 15 characters or less");
        return;
    }
    if (!user.name?.trim()) {
        toast.error("Name cannot be empty");
        return;
    }

    try {
        const formData = new FormData();

        formData.append("username", user.username);
        formData.append("name", user.name);
        formData.append("age", user.age);
        formData.append("gender", user.gender);

        // 🔥 Only send if changed
        if (selectedFile) {
            formData.append("profilePhoto", selectedFile);
        }

        const res = await api.put(
            '/api/update/profile',
            formData
        );

        setUser(res.data.user);

        // 🔥 Update preview with actual saved image
        setProfilePreview(res.data.user.profilePhoto || defaultAvatar);

        toast.success("Profile updated successfully!");

    } catch (err) {
        console.error(err);
        toast.error("Error updating profile");
    }
};

    const handleBack = () => {
        if (window.history.length > 1) {
            navigate(-1);
        } else {
            navigate("/dashboard");
        }
    };

    // Prevent rendering before user loads
    if (!user) return null;

    return (
        <>
            <Navbar />

            <button onClick={handleBack} className={styles['back-button']}>
                <img src={backButton} alt="back button" />
            </button>

            <div className={styles.container}>
                <div className={styles['content-container']}>
                    <p className={styles['profile-heading']}>My Profile</p>

                    <div className={styles['info-box']}>

                        {/* LEFT SIDE */}
                        <div className={styles['profile-input-fields']}>
                            <p>Personal Information</p>

                            <div className={styles.inputs}>

                                <div className={styles['vertical-inputs']}>

                                    <div className={styles['input-section']}>
                                        <p>Username</p>
                                        <input
                                            className={styles['input-vertical']}
                                            type="text"
                                            value={user.username || ''}
                                            onChange={handleUsernameChange}
                                            disabled={!usernameEditable}
                                        />
                                        {!usernameEditable && (
                                            <small style={{ color: 'red' }}>
                                                Username change limit reached for 14 days
                                            </small>
                                        )}
                                    </div>

                                    <div className={styles['input-section']}>
                                        <p>Name</p>
                                        <input
                                            className={styles['input-vertical']}
                                            type="text"
                                            value={user.name || ''}
                                            onChange={e => handleChange('name', e.target.value)}
                                        />
                                    </div>

                                </div>

                                <div className={styles['horizontal-inputs']}>

                                    <div className={styles['input-section-horizontal']}>
                                        <p>Age</p>
                                        <input
                                            className={styles['input-horizontal']}
                                            type="number"
                                            min="0"
                                            max="120"
                                            value={user.age || ''}
                                            onChange={e => handleChange('age', e.target.value)}
                                        />
                                    </div>

                                    <div className={styles['input-section-horizontal']}>
                                        <p>Gender</p>

                                        <div className={styles.selectWrapper}>
                                            <select
                                                className={styles.customSelect}
                                                value={user.gender || ''}
                                                onChange={(e) => handleChange('gender', e.target.value)}
                                                required
                                            >
                                                <option value="" disabled hidden>
                                                    Select
                                                </option>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                                <option value="other">Other</option>
                                            </select>

                                            <span className={styles.selectArrow}></span>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>

                        {/* RIGHT SIDE — PROFILE IMAGE */}
                        <div className={styles['profile-image-edit']}>

                            <img
                                className={styles['profile-img']}
                                src={profilePreview}
                                alt="profile"
                                onError={() => setProfilePreview(defaultAvatar)}
                            />

                            <label htmlFor="profile-upload" style={{ cursor: 'pointer' }}>
                                <img src={cameraIcon} alt="camera icon" /> Edit
                            </label>

                            <input
                                type="file"
                                id="profile-upload"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={handleImageChange}
                            />

                        </div>

                    </div>

                    {/* change later to conditional rendering */}
                    <button
                        className={styles['save-button']}
                        onClick={handleSave}
                    >
                        Save Changes
                    </button>

                </div>
            </div>
        </>
    );
};