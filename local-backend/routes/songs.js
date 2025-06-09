import express from "express";
import songController from "../controllers/songController.js";

const router = express.Router();

// GET ALL SONGS
router.get("/", songController.getFilteredSongs);

//GET SONG BY ID
router.get("/byId", songController.getSongById);

//EDIT SONG
router.put("/edit", songController.editSong);

export default router;