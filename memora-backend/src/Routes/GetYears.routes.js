import express from 'express';
import { getYears } from '../Controllers/GetYears.controllers.js';

const router = express.Router();

router.get('/', getYears);

export default router;