const db = require('../config/db');

const getAllGenres = (req, res) => 
{
  const sql = 'SELECT * FROM genres';
  db.query(sql, (err, results) => 
  {
    if (err) 
    {
      console.error('Request execution error:', err.message);
      res.status(500).json({ error: 'Server error', details: err.message });
    } 
    else 
    {
      res.json(results);
    }
  });
};

const getGenreById = (req, res) => 
{
  const genreId = req.params.genreId;
  const sql = 'SELECT * FROM genres WHERE id = ?';
  db.query(sql, [genreId], (err, results) => 
  {
    if (err) 
    {
      console.error('Request execution error:', err.message);
      res.status(500).json({ error: 'Server error', details: err.message });
    } 
    else if (results.length === 0) 
    {
      res.status(404).json({ error: 'Genre not found' });
    } 
    else 
    {
      res.json(results[0]);
    }
  });
};

const addGenre = (req, res) => 
{
  const { genre_name } = req.body;
  const sql = 'INSERT INTO genres (genre_name) VALUES (?)';
  db.query(sql, [genre_name], (err, result) => 
  {
    if (err) 
    {
      console.error('Request execution error:', err.message);
      res.status(500).json({ error: 'Server error', details: err.message });
    } 
    else 
    {
      res.status(201).json({ message: 'Genre added successfully', genreId: result.insertId });
    }
  });
};

const updateGenre = (req, res) => 
{
  const genreId = req.params.genreId;
  const { genre_name } = req.body;
  const sql = 'UPDATE genres SET genre_name = ? WHERE id = ?';
  db.query(sql, [genre_name, genreId], (err, result) => 
    {
    if (err) 
    {
      console.error('Request execution error:', err.message);
      res.status(500).json({ error: 'Server error', details: err.message });
    } 
    else if (result.affectedRows === 0) 
    {
      res.status(404).json({ error: 'Genre not found' });
    } 
    else 
    {
      res.json({ message: 'The genre has been successfully updated' });
    }
  });
};

const deleteGenre = (req, res) => {
  const genreId = req.params.genreId; 
  const sql = 'DELETE FROM genres WHERE id = ?'; 

  db.query(sql, [genreId], (err, result) => {
    if (err) {
      console.error('Request execution error:', err.message);
      res.status(500).json({ error: 'Server error', details: err.message });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Genre not found' });
    } else {
      res.json({ message: 'Genre successfully deleted' });
    }
  });
};

module.exports = { getAllGenres, deleteGenre, getGenreById, addGenre, updateGenre };
