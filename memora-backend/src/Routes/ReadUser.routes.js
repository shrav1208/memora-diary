import express from 'express';
import { readUser } from '../Controllers/ReadUser.controllers.js';

const router = express.Router();

router.get('/', readUser);

export default router;