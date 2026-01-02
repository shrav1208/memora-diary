import express from 'express';
import User from '../Models/User.js';
import bcrypt from "bcrypt";
import rateLimit from "express-rate-limit";

const router = express.Router();

const loginLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 100, // limit each IP to 100 requests
    message: "Too many login attempts, please try again later"
});

const fakeHash = "$2b$10$TOuIZcBAgJzMFJy6R/zN2.g7e8gKSpDhX335Q5M39ortaP5sQFNSC"

router.post('/', loginLimiter, async(req, res)=>{
    try{
        // console.log(req.body)
        const {username, password} = req.body;

        if(!username || !password){
            return res.status(400).json({
                success: false,
                message: "Please enter both Username and Password!"
            })
        }

        const user = await User.findOne({username});

        // console.log(user);

        let hashToCompare = fakeHash;

        if(user) hashToCompare = user.password;

        const verifyPass = await bcrypt.compare(password, hashToCompare); 
        
        if(!user || !verifyPass){
            return res.status(401).json({ 
            success: false, 
            message: 'Invalid Credentials'
            });
        }
        
        return res.status(200).json({ 
        success: true, 
        message: 'Successfully logged in' 
        });

    }catch(err){
        console.error("Login error:", err);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
    
});

export default router;
