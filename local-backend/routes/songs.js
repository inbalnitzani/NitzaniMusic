import express from "express";
import db from "../db/index.js";

const router = express.Router();

router.get("/", async (req, res) => {
    const limit = Number(req.query.limit) || 10;
    const page = Number(req.query.page) || 1;
    const offset = (page - 1) * limit;
  
    try {
      const result = await db.query(
        "SELECT * FROM songs ORDER BY id ASC LIMIT $1 OFFSET $2",
        [limit, offset]
      );

      const countResult = await db.query("SELECT COUNT(*) FROM songs");

      res.json({
        rows: result.rows,
        total: parseInt(countResult.rows[0].count, 10)
      });

    } catch (err) {
      console.error("❌ DB query error:", err.message);
      res.status(500).json({ error: "DB query failed" });
    }
  });
  

export default router;
