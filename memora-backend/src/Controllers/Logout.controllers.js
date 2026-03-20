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
            path: "/",                                              // MUST match
            sameSite: "strict",                                     // MUST match
            secure: process.env.NODE_ENV === 'production',          // MUST match (true only on HTTPS)
            httpOnly: true,
        });

        res.status(200).json({ 
            success: true, 
            message: "Logged out successfully"
        });
    });
};