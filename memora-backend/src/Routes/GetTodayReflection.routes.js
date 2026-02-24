import express from 'express';
import { getTodayReflection } from '../Controllers/GetTodayReflection.controllers.js';

const router = express.Router();

router.get("/", getTodayReflection);

export default router;