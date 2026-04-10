import cloudinary from "../Config/cloudinary.js";
import streamifier from "streamifier";

export const uploadToCloudinary = (fileBuffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder: "memora_profiles" },
            (error, result) => {
                if (result) resolve(result);
                else reject(error);
            }
        );

        streamifier.createReadStream(fileBuffer).pipe(stream);
    });
};