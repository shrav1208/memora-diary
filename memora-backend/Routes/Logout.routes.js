import express from 'express';

const router = express.Router();

router.post('/', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error("Session destroy error:", err);
            return res.status(500).json({ message: "Logout failed" });
        }

        res.clearCookie("mem-session-id", {
            path: "/",           // MUST match
            sameSite: "lax",     // MUST match
            secure: false        // MUST match (true only on HTTPS)
        });

        res.status(200).json({ success: true });
    });
});


export default router;