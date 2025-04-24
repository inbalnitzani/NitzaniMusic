import express from "express";
import bodyParser from "body-parser";
import env from "dotenv";
import songsRouter from "./routes/songs.js";
import cors from "cors";

const app = express();
const port = 3000;
app.use(cors());

env.config();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.send("🎵 NitzaniMusic API is running!");
});

app.use("/songs", songsRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
