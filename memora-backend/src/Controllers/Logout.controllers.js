export const logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error("Session destroy error:", err);
            return res.status(500).json({ 
                success: false,
                message: "Logout failed",
            });
        }

        res.clearCookie("memora-session-id", {
            path: "/",           // MUST match
            sameSite: "lax",     // MUST match
            secure: false        // MUST match (true only on HTTPS)
        });

        res.status(200).json({ 
            success: true, 
            message: "Logged out successfully"
        });
    });
};