import express from 'express';
import { getMoods } from '../Controllers/GetMoods.controllers.js'

const router = express.Router();

router.get('/', getMoods);

export default router;