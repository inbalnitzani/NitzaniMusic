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


const corsOptions = {
  origin: ['http://localhost:5173', 'https://nitzani-client.onrender.com'],
  credentials: true
};

app.use(cors(corsOptions));

app.set('trust proxy', 1); 
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production', 
    sameSite: 'lax'
  }
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
  console.log(`Server running on Port:${port}`);
});
