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

        const authors = await db.query(
          "SELECT ARRAY( SELECT DISTINCT unnest(authors) FROM songs);",
        );
  
        const keywords = await db.query(
          "SELECT ARRAY( SELECT DISTINCT unnest(keywords) FROM songs);",
        );
  
        return Promise.all([authors, keywords]).then(([a, k]) => ({
            authors: a.rows.map(r => r.value),
            keywords: k.rows.map(r => r.value),
          }));

}
