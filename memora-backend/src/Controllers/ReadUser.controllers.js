import User from '../Models/User.js';

export const readUser = async(req, res) => {
    try {
        const user = await User.findById(req.session.userID).select("-password"); // means select everything but password

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            user,
        });

    } catch(err) {
        console.error("Read user error:", err);
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};