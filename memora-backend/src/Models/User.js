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

    age: {
        type: Number,
        default: null
    },

    gender: {
        type: String,
        default: null
    },

    profilePhoto: {
        type: String,   // store image URL or file path
        default: null
    },

    profileCompleted: {
        type: Boolean,
        default: false
    }

}, { timestamps: true });

const User = mongoose.model("User", userSchema, "users");
export default User;