import User from '../Models/User.js';
import { uploadToCloudinary } from '../Utils/CloudinaryUpload.js';

export const updateProfile = async (req, res) => {
    if (!req.session.userID) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const { username, name, age, gender } = req.body;

        // Validate username
        if (!username?.trim()) {
            return res.status(400).json({ message: "Username is required" });
        }
        if (username.trim().length < 5 || username.trim().length > 15) {
            return res.status(400).json({ message: "Username must be 5-15 characters" });
        }

        // Validate name
        if (!name?.trim()) {
            return res.status(400).json({ message: "Name is required" });
        }
        if (name.trim().length > 30) {
            return res.status(400).json({ message: "Name must be 30 characters or less" });
        }

        const user = await User.findById(req.session.userID);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // 🔥 Username change tracking
        if (username !== user.username) {
            user.usernameChanges.push(Date.now());
        }

        user.username = username.trim().toLowerCase();
        user.name = name;
        user.age = age && age !== "null" && age !== "undefined" ? Number(age) : null;
        user.gender = gender && gender !== "null" && gender !== "undefined" ? gender : null;

        // 🔥 HANDLE IMAGE UPLOAD
        if (req.file) {
            console.log("Uploading to Cloudinary...");
            const result = await uploadToCloudinary(req.file.buffer);
            console.log("Cloudinary result:", result);
            user.profilePhoto = result.secure_url;
        }

        await user.save();

        res.json({ user });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};