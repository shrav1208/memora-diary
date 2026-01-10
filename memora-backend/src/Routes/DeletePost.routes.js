import express from 'express';
import { deletePost } from '../Controllers/DeletePost.controllers.js';

const router = express.Router();

router.delete('/:id', deletePost);

export default router;