import express from 'express';
import { updatePost } from '../Controllers/UpdatePost.controllers.js';

const router = express.Router();

router.patch('/:id', updatePost);

export default router;