import express from "express";
import { getDailyMood } from '../Controllers/GetDailyMood.controllers.js'

const router = express.Router();

router.get('/', getDailyMood);

export default router;