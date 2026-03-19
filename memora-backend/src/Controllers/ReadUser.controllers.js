import User from '../Models/User.js';

export const readUser = async(req, res)=>{
    try{

        const user = await User.findById(req.session.userID).select("-password"); // means select everything but password

        if (!user) {
            // console.log("IAM LOSIGN MY MIND");
            return res.status(404).json({
                success: false,
                message: "IAM LOSIGN MY MIND",
            });
        }

        return res.status(201).json({
            success: true, 
            user,
        });
        
    }catch(err){
        console.error("IAM LOSIGN MY MIND:", err);
        return res.status(500).json({ 
            success: false,
            message: "IAM LOSIGN MY MIND",
        });
    }
};