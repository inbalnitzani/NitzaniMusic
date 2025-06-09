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
    const filtersOptions = await SongModel.getFiltersOptions();
    res.json(filtersOptions);
    }
    catch(err){
        console.error("❌ DB query error:", err.message);
        res.status(500).json({ error: "DB query failed" });  
    }
  };

const getSongById = async (req,res) => {
  try{
    const {id} = req.query.id;
    if(!id)
      return res.status(400).json({ error: "Missing song ID in query" });

    const song = await SongModel.getSongById(id);
      if (!song) {
      return res.status(404).json({ error: "Song not found" });
    }
    res.json(song);
  }
  catch(err){
        console.error("❌ DB query error:", err.message);
        res.status(500).json({ error: "DB query failed" });  
    }
}

const editSong = async (req, res) => {
  try {
    const {
      id,
      title,
      artist,
      album,
      track,
      authors,
      tags,
      keywords,
      lyrics,
      isFree,
      score,
      date,
    } = req.body;

    if (!id) {
      return res.status(400).json({ error: "Missing song ID" });
    }

    const result = await SongModel.updateSong({
      id,
      title,
      artist,
      album,
      track,
      authors,
      tags,
      keywords,
      lyrics,
      isFree,
      score,
      year: date ? new Date(date).getFullYear() : null,
    });

    res.json({ message: "Song updated", song: result });
  } catch (err) {
    console.error("❌ DB query error:", err.message);
    res.status(500).json({ error: "DB query failed" });
  }
};


  

export default {
  getFilteredSongs,getFilters,getSongById,editSong
};
