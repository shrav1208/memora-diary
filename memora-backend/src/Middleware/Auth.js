export default function requireAuth(req, res, next){
    if(!req.session.userID){
        return res.status(401).json({ 
            success: false, 
            message: 'Unauthorized',
        });
    }
    next();
}