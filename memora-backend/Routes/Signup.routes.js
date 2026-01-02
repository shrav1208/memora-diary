import express from 'express';
import User from '../Models/User.js';
import bcrypt from 'bcrypt';

const router = express.Router();

router.post("/", async(req, res)=>{
    try{
        const {username, password, name} = req.body;

        if(!username.trim() || !password || !name.trim()){
            return res.status(400).json({
                success: false,
                message: "Please enter all Fields!"
            })
        }

        if(password.trim().length < 6){
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters!"
            })
        }

        const normalizedUsername = username.trim().toLowerCase();

        if (normalizedUsername.length < 5 || normalizedUsername.length > 15) {
            return res.status(400).json({
                success: false,
                message: "Username must be 5-15 characters"
            });
        }

        if (name.trim().length > 30) {
            return res.status(400).json({
                success: false,
                message: "Name must be 1-30 characters"
            });
        }

        const existingUser = await User.findOne({username: normalizedUsername});

        if(existingUser){
            return res.status(409).json({
                success: false,
                message: "User already exists",
            });
        }

        const hashPass = await bcrypt.hash(password, 10);
        const user = new User({
            username: normalizedUsername,
            password: hashPass,
            name: name.trim(),
        });
        await user.save();

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            userId: user._id
        });

    }catch(err){
        console.error("Signup error:", err);
        return res.status(500).json({
            success: false,
            message: "Server error" + err.message,
        });
    }
})

export default router;