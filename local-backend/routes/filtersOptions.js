import express from "express";
import songController from "../controllers/songController.js";

const router = express.Router();

router.get("/", songController.getFilters);

export default router;
