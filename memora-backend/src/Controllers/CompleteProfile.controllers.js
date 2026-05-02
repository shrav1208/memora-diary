import User from "../Models/User.js";
import { uploadToCloudinary } from "../Utils/CloudinaryUpload.js";

export const completeProfile = async (req, res) => {
    try {
        const userId = req.session.userID;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }

        const { age, gender } = req.body;

        if (!age || !gender) {
            return res.status(400).json({
                success: false,
                message: "Age and gender required"
            });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // ✅ Basic fields
        user.age = age && age !== "null" && age !== "undefined" ? Number(age) : null;
        user.gender = gender && gender !== "null" && gender !== "undefined" ? gender.trim() : null;

        // 🔥 HANDLE IMAGE (NEW)
        if (req.file) {
            const result = await uploadToCloudinary(req.file.buffer);
            user.profilePhoto = result.secure_url;
        }

        user.profileCompleted = true;

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Profile completed",
            user
        });

    } catch (err) {
        console.error("Profile setup error:", err);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};