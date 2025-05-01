import * as SongModel from "../models/songModel.js";

const getFilteredSongs = async (req, res) => {
  try {
    const authors = Array.isArray(req.query.authors)
      ? req.query.authors
      : req.query.authors ? [req.query.authors] : [];

    const keywords = Array.isArray(req.query.keywords)
      ? req.query.keywords
      : req.query.keywords ? [req.query.keywords] : [];

    const lyrics = req.query.lyrics || '';
    const limit = Number(req.query.limit) || 10;
    const page = Number(req.query.page) || 1;
    const offset = (page - 1) * limit;

    const [rows, total] = await Promise.all([
      SongModel.getFilteredSongs({ authors, keywords, lyrics, limit, offset }),
      SongModel.countFilteredSongs({ authors, keywords, lyrics })
    ]);

    res.json({ rows, total });
  } catch (err) {
    console.error("❌ DB error:", err.message);
    res.status(500).json({ error: "DB query failed" });
  }
};

const getFilters = async (req, res) => {

    try{
    const filtersOptions = await Promise.all(SongModel.getFiltersOptions());
    res.json(filtersOptions);
    }
    catch{
        console.error("❌ DB query error:", err.message);
        res.status(500).json({ error: "DB query failed" });  
    }
  };

  

export default {
  getFilteredSongs,getFilters
};
