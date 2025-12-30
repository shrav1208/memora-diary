import express from 'express';
import User from '../Models/User.js';

const router = express.Router();

router.post('/login', async(req, res)=>{
    try{
        console.log(req.body)
        const {username, password} = req.body;

        if(!username || !password){
            return res.status(404).json({
                success: false,
                message: "Please enter both Username and Password!"
            })
        }

        const user = await User.findOne({username, password});

        console.log(user);

        if(!user){ 
            return res.status(401).json({ 
                success: false, 
                message: 'Invalid Credentials'
            });
        }
        else{
            res.status(200).json({ 
                success: true, 
                message: 'Successfuly logged in' 
            });
        }
    }catch(err){
        console.error("Login error:", error);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
    
});

export default router;
