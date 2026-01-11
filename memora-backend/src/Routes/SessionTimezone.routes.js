import express from "express";
import { sessionTimezone } from '../Controllers/SessionTimezone.controllers.js'

const router = express.Router();

router.post('/', sessionTimezone);

export default router;