import express from 'express';
import { updatePost } from '../Controllers/UpdatePost.controllers.js';

const router = express.Router();

router.patch('/', updatePost);

export default router;