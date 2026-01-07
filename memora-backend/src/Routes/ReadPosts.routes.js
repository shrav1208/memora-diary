import express from "express";
import { readPosts } from "../Controllers/ReadPosts.controllers.js";

const router = express.Router();

router.get('/', readPosts);

export default router;