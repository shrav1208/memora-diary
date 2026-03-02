import express from 'express';
import { updateProfile } from '../Controllers/UpdateProfile.controllers.js';

const router = express.Router();

router.put('/', updateProfile);

export default router;