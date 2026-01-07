import express from 'express';
import { signup } from '../Controllers/Signup.controllers.js';

const router = express.Router();

router.post("/", signup);

export default router;