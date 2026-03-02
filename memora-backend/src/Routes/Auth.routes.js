import express from "express";
import User from "../Models/User.js"; // adjust path if needed

const router = express.Router();

router.get("/", async (req, res) => {
    if (!req.session.userID) {
        return res.status(401).json({ authenticated: false });
    }

    try {
        const user = await User.findById(req.session.userID).select("-password");

        if (!user) {
            return res.status(404).json({ authenticated: false });
        }

        return res.status(200).json({
            authenticated: true,
            user: user, // ✅ now returning full user object
        });

    } catch (err) {
        return res.status(500).json({ message: "Server error" });
    }
});

export default router;