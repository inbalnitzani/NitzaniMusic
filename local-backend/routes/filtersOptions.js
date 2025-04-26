import express from "express";
import db from "../db/index.js";

const router = express.Router();

router.get("/", async (req, res) => {
  console.log("Request received at /filtersOptions"); // 🔥

    try {
      const result = await db.query(
        "SELECT ARRAY( SELECT DISTINCT unnest(authors) FROM songs);",
      );

      res.json( result.rows[0].array);

    } catch (err) {
      console.error("❌ DB query error:", err.message);
      res.status(500).json({ error: "DB query failed" });
    }
  });
  

export default router;
