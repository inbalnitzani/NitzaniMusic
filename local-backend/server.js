import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import passport from "./config/passport.js";
import songsRouter from "./routes/songs.js";
import filtersRouter from "./routes/filtersOptions.js";
import authRouter from "./routes/auth.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: "https://nitzanimusic.onrender.com",
  credentials: true
}));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("🎵 NitzaniMusic API is running!");
});

app.use("/songs", songsRouter);
app.use("/filtersOptions", filtersRouter);
app.use("/auth", authRouter);  

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
