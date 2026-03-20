import express from 'express';
import { login } from '../Controllers/Login.controllers.js'

const router = express.Router();

router.post('/', login);

export default router;