import express from "express";
import db from "../db/index.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const limit = Number(req.query.limit) || 10;
  const page = Number(req.query.page) || 1;
  const offset = (page - 1) * limit;

  const authors = req.query.authors
  ? Array.isArray(req.query.authors)
    ? req.query.authors
    : [req.query.authors]
  : [];

  const keywords = req.query.keywords
  ? Array.isArray(req.query.keywords)
    ? req.query.keywords
    : [req.query.keywords]
  : [];

  const lyrics = req.query.lyrics || '';


  let whereClauses = [];
  let values = [];
  let paramIndex = 1;

  //AUTHORS
  if (authors.length > 0) {
    whereClauses.push(`authors && $${paramIndex}::text[]`);
    values.push(authors);
    paramIndex++;
  }
  
  //KEYWORDS
  if (keywords.length > 0) {
    whereClauses.push(`keywords && $${paramIndex}::text[]`);
    values.push(keywords);
    paramIndex++;
  }

  //LYRICS
  if (lyrics) {
    whereClauses.push(`lyrics ILIKE $${paramIndex}`);
    values.push(`%${lyrics}%`);
    paramIndex++;
  }
  

  const whereSQL = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';


  try {
    const queryText = `
      SELECT * FROM songs
      ${whereSQL}
      ORDER BY id ASC
      LIMIT $${paramIndex}
      OFFSET $${paramIndex + 1}
    `;

    values.push(limit);
    values.push(offset);

    const result = await db.query(queryText, values);

    const countQuery = `
      SELECT COUNT(*) FROM songs
      ${whereSQL}
    `;
    const countResult = await db.query(countQuery, values.slice(0, paramIndex - 1));

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
