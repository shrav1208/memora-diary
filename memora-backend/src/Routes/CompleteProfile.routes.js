import express from 'express';
import { completeProfile } from '../Controllers/CompleteProfile.controllers.js';
import { Upload } from '../Middleware/Upload.js';

const router = express.Router();

router.post('/', Upload.single("profilePhoto"), completeProfile);

export default router;