import express from "express";
import { getDays } from '../Controllers/GetDays.controllers.js'

const router = express.Router();

router.get('/', getDays);

export default router;