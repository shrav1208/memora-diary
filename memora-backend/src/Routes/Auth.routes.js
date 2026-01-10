import express from 'express';

const router = express.Router();

router.get('/', (req, res)=>{
    if(!req.session.userID){
        return res.status(401).json({ authenticated: false });
    }

    // console.log(req.session.userID)

    return res.status(200).json({
        authenticated: true,
        user: req.session.userID,
    })
})

export default router;