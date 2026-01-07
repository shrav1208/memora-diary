import express from 'express';
import { create } from '../Controllers/Create.controllers.js';

const router = express.Router();

router.post('/', create);

export default router;