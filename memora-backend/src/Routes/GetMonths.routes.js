import express from "express";
import { getMonths } from '../Controllers/GetMonths.controllers.js'

const router = express.Router();

router.get('/', getMonths);

export default router;