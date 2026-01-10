import express from 'express';
import { createPost } from '../Controllers/CreatePost.controllers.js';

const router = express.Router();

router.post('/', createPost);

export default router;