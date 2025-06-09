import db from "../db/index.js";

export async function getFilteredSongs({ authors, keywords, lyrics, limit, offset }) {
  let whereClauses = [];
  let values = [];
  let paramIndex = 1;

  if (authors.length > 0) {
    whereClauses.push(`authors && $${paramIndex}::text[]`);
    values.push(authors);
    paramIndex++;
  }

  if (keywords.length > 0) {
    whereClauses.push(`keywords && $${paramIndex}::text[]`);
    values.push(keywords);
    paramIndex++;
  }

  if (lyrics) {
    whereClauses.push(`lyrics ILIKE $${paramIndex}`);
    values.push(`%${lyrics}%`);
    paramIndex++;
  }

  const whereSQL = whereClauses.length > 0 ? `WHERE ${whereClauses.join(" AND ")}` : "";

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
  return result.rows;
}

export async function countFilteredSongs({ authors, keywords, lyrics }) {
  let whereClauses = [];
  let values = [];
  let paramIndex = 1;

  if (authors.length > 0) {
    whereClauses.push(`authors && $${paramIndex}::text[]`);
    values.push(authors);
    paramIndex++;
  }

  if (keywords.length > 0) {
    whereClauses.push(`keywords && $${paramIndex}::text[]`);
    values.push(keywords);
    paramIndex++;
  }

  if (lyrics) {
    whereClauses.push(`lyrics ILIKE $${paramIndex}`);
    values.push(`%${lyrics}%`);
    paramIndex++;
  }

  const whereSQL = whereClauses.length > 0 ? `WHERE ${whereClauses.join(" AND ")}` : "";

  const countQuery = `
    SELECT COUNT(*) FROM songs
    ${whereSQL}
  `;

  const countResult = await db.query(countQuery, values);
  return parseInt(countResult.rows[0].count, 10);
}

export async function getFiltersOptions() {
  const authorsRes = await db.query(
    "SELECT DISTINCT unnest(authors) AS author FROM songs WHERE array_length(authors, 1) > 0;"
  );

  const keywordsRes = await db.query(
    "SELECT DISTINCT unnest(keywords) AS keyword FROM songs WHERE array_length(keywords, 1) > 0;"
  );

  return {
    authors: authorsRes.rows.map(r => r.author),
    keywords: keywordsRes.rows.map(r => r.keyword),
  };

}

export async function getSongById(id) {
  const song = await db.query(
    "SELECT * FROM songs WHERE id = $1",
    [id]
  );
  return result.rows[0]; 
}

export async function updateSong(song) {
  const query = `
    UPDATE songs
    SET title = $1,
        artist = $2,
        album = $3,
        authors = $4,
        tags = $5,
        keywords = $6,
        lyrics = $7,
        is_free = $8,
        score = $9,
        year = $10
    WHERE id = $11
    RETURNING *;
  `;

  const values = [
    song.title,
    song.artist,
    song.album,
    song.authors,
    song.tags,
    song.keywords,
    song.lyrics,
    song.isFree,
    song.score,
    song.year,
    song.id,
  ];

  const result = await db.query(query, values);
  return result.rows[0];
}
