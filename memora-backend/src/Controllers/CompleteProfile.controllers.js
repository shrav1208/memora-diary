import User from "../Models/User.js";

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

        user.age = Number(age);
        user.gender = gender.trim();
        user.profileCompleted = true;

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Profile completed"
        });

    } catch (err) {
        console.error("Profile setup error:", err);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};