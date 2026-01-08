import express from "express";
import { searchPosts } from "../Controllers/SearchPosts.controllers.js";

const router = express.Router();

router.get('/', searchPosts);

export default router;