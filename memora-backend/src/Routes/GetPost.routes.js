import express from 'express';
import { getPost } from '../Controllers/GetPost.controllers.js';

const router = express.Router();

router.get('/', getPost);

export default router;