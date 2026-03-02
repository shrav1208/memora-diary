import express from 'express';
import { completeProfile } from '../Controllers/CompleteProfile.controllers.js';

const router = express.Router();

router.post('/', completeProfile);

export default router;