import User from '../Models/User.js';
import bcrypt from "bcrypt";

const fakeHash = "$2b$10$TOuIZcBAgJzMFJy6R/zN2.g7e8gKSpDhX335Q5M39ortaP5sQFNSC"

export const login = async(req, res)=>{
    try{
        
        if (req.session.userID) {
            return res.status(400).json({
                message: "Already logged in"
            });
        }

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
        
        req.session.userID = user._id;

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
    
};
