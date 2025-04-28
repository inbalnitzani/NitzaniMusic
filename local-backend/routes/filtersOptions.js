import express from "express";
import db from "../db/index.js";

const router = express.Router();

router.get("/", async (req, res) => {

    try {
      const authorsResult = await db.query(
        "SELECT ARRAY( SELECT DISTINCT unnest(authors) FROM songs);",
      );

      const keywordsResult = await db.query(
        "SELECT ARRAY( SELECT DISTINCT unnest(keywords) FROM songs);",
      );

      res.json({
        authors: authorsResult.rows[0].array,
        keywords: keywordsResult.rows[0].array
      });

    } catch (err) {
      console.error("❌ DB query error:", err.message);
      res.status(500).json({ error: "DB query failed" });
    }
  });
  

export default router;
