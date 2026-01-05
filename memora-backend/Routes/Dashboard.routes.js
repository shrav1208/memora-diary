import express from 'express';
import User from '../Models/User.js';

const router = express.Router();

router.get('/', async(req, res)=>{
    try{
        
        // console.log(req);

        const user = await User.findById(req.session.userID).select("name");

        if (!user) {
            // console.log("IAM LOSIGN MY MIND");
            return res.status(404).json({ message: "IAM LOSIGN MY MIND" });
        }

        // console.log(user);

        return res.json({success: true, user});
        
    }catch(err){
        console.error("IAM LOSIGN MY MIND:", err);
        return res.status(500).json({ message: "IAM LOSIGN MY MIND" });
    }
})

export default router;