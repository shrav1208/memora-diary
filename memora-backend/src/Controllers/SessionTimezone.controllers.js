export const sessionTimezone = async (req, res) => {
    const { timezone } = req.body;

    if (!Intl.supportedValuesOf("timeZone").includes(timezone)) {
        return res.status(400).json({ 
            success: false, 
            message: "Invalid timezone" 
        });
    }

    req.session.timezone = timezone;
    res.json({ success: true });
}