import mongoose from 'mongoose';

const dbConnection = async () => {
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/test");
        console.log("MongoDB connected successfully");
    }catch(err){
        console.error("MongoDB connection failed:", err.message);
        process.exit(1);
    }
}

export default dbConnection;