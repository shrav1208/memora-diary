import express from 'express';
import { updateProfile } from '../Controllers/UpdateProfile.controllers.js';
import { Upload } from "../Middleware/Upload.js";

const router = express.Router();

router.put('/', Upload.single("profilePhoto"), updateProfile);

export default router;