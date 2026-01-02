import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        minlength: 5,
        maxlength: 15,

    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    name: {
        type: String,
        required: true,
        maxlength: 30,
        minlength: 1,
        trim: true,
    },
},
{ timestamps: true },
);

const User = mongoose.model("User", userSchema, "users");
export default User;