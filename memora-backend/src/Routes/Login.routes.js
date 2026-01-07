import express from 'express';
import rateLimit from 'express-rate-limit';
import { login } from '../Controllers/Login.controllers.js'

const router = express.Router();

const loginLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 100, // limit each IP to 100 requests
    message: "Too many login attempts, please try again later"
});

router.post('/', loginLimiter, login);

export default router;
