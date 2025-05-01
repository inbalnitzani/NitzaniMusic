import express from "express";
import songController from "../controllers/songController.js";

const router = express.Router();

router.get("/", songController.getFilteredSongs);

export default router;