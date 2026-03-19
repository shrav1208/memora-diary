import User from '../Models/User.js';
import bcrypt from "bcrypt";

const fakeHash = process.env.FAKE_HASH;

export const login = async (req, res) => {
    try {

        if (req.session.userID) {
            return res.status(400).json({
                message: "Already logged in"
            });
        }

        const { username, password, rememberMe } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: "Please enter both Username and Password!"
            });
        }

        const user = await User.findOne({ username });

        let hashToCompare = fakeHash;
        if (user) hashToCompare = user.password;

        const verifyPass = await bcrypt.compare(password, hashToCompare);

        if (!user || !verifyPass) {
            return res.status(401).json({
                success: false,
                message: "Invalid Credentials"
            });
        }

        // ✅ Create session — regenerate first to prevent session fixation
        req.session.regenerate((err) => {
            if (err) {
                return res.status(500).json({ success: false, message: "Server error" });
            }

            req.session.userID = user._id;

            // ⭐ Remember Me Logic
            if (rememberMe) {
                const THIRTY_DAYS = 1000 * 60 * 60 * 24 * 30;
                req.session.cookie.maxAge = THIRTY_DAYS;
                req.session.cookie.expires = new Date(Date.now() + THIRTY_DAYS);
            } else {
                // Session expires when browser closes
                req.session.cookie.expires = false;
                req.session.cookie.maxAge = null;
            }

            return res.status(200).json({
                success: true,
                message: "Successfully logged in"
            });
        });

    } catch (err) {
        console.error("Login error:", err);

        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};
