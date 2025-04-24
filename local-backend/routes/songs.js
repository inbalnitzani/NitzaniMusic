import express from "express";
import db from "../db/index.js";

const router = express.Router();

router.get('/', async (req, res) => {
    const limit = 15; 
  
    let query = 'SELECT * FROM songs';
    let conditions = [];
    let values = [];
    let i = 1;
  
  
    query += ` ORDER BY id ASC LIMIT $${i}`;
    values.push(limit);
    i++;
    
    try {
  
      const result = await db.query(query, values);
      res.json(result.rows);
    } catch (err) {
      console.error("❌ DB query error:", err.message);
      res.status(500).json({ error: "DB query error" });
    }
  });

export default router;
