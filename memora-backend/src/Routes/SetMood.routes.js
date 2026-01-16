import express from "express";
import { setMood } from '../Controllers/SetMood.controllers.js'

const router = express.Router();

router.post('/', setMood);

export default router;