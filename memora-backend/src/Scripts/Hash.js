//Script to hash un-hashed passwords in db

import bcrypt from "bcrypt"
import User from "../Models/User.js"
import mongoose from "mongoose";

(async ()=>{
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/test")

        console.log("MongoDB connected succeessfully")

        const users = await User.find();

        for(let user of users){
            if (!user.password || typeof user.password !== "string") continue;
            if (user.password.startsWith("$2")) continue;
            const hashPassword = await bcrypt.hash(user.password, 10);
            user.password = hashPassword;
            await user.save();
        }

        console.log("Passwords hashed") 

        await mongoose.disconnect();
        process.exit(0);    
    }catch(err){
    console.error(err);
    process.exit(1);
    }
})();