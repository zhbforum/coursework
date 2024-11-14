const db = require('../config/db');

const getAllAuthors = (req, res) => 
{
  const sql = 'SELECT * FROM authors';
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

const getAuthorById = (req, res) => 
{
  const authorId = req.params.authorId;
  const sql = 'SELECT * FROM authors WHERE id = ?';
  db.query(sql, [authorId], (err, results) => 
  {
    if (err) 
    {
      console.error('Request execution error:', err.message);
      res.status(500).json({ error: 'Server error', details: err.message });
    } 
    else if (results.length === 0) 
    {
      res.status(404).json({ error: 'Author not found' });
    } 
    else 
    {
      res.json(results[0]);
    }
  });
  console.log('Executing query:', sql, [authorId]);
};

const addAuthor = (req, res) => 
{
  const { name, bio } = req.body;
  const sql = 'INSERT INTO authors (name, bio) VALUES (?, ?)';
  db.query(sql, [name, bio], (err, result) => 
  {
    if (err) 
    {
      console.error('Request execution error:', err.message);
      res.status(500).json({ error: 'Server error', details: err.message });
    } 
    else 
    {
      res.status(201).json({ message: 'Author successfully added', authorId: result.insertId });
    }
  });
};

const updateAuthor = (req, res) => 
{
  const authorId = req.params.authorId;
  const { name, bio } = req.body;
  const sql = 'UPDATE authors SET name = ?, bio = ? WHERE id = ?';
  db.query(sql, [name, bio, authorId], (err, result) => 
  {
    if (err) 
    {
      console.error('Request execution error:', err.message);
      res.status(500).json({ error: 'Server error', details: err.message });
    } 
    else if (result.affectedRows === 0) 
    {
      res.status(404).json({ error: 'Author not found' });
    } 
    else 
    {
      res.json({ message: 'Author successfully updated' });
    }
  });
};

module.exports = { getAllAuthors, getAuthorById, addAuthor, updateAuthor };
