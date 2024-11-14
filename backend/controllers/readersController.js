const db = require('../config/db');

const getAllReaders = (req, res) => 
{
  const sql = 'SELECT * FROM readers';
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

const addReader = (req, res) => 
{
  const { name, email, phone } = req.body;
  const sql = `INSERT INTO readers (name, email, phone) VALUES (?, ?, ?)`;

  db.query(sql, [name, email, phone], (err, result) => 
  {
    if (err) 
    {
      console.error('Request execution error:', err.message);
      res.status(500).json({ error: 'Server error', details: err.message });
    } 
    else 
    {
      res.status(201).json({ message: 'Reader good add', readerId: result.insertId }); //TODO: "change "good" for succesefdfdsfdsds"
    }
  });
};

const updateReader = (req, res) => 
{
  const readerId = req.params.readerId;
  const { name, email, phone } = req.body;
  const sql = 'UPDATE readers SET name = ?, email = ?, phone = ? WHERE id = ?';
  db.query(sql, [name, email, phone, readerId], (err, result) => 
  {
    if (err) 
    {
      console.error('Request execution error:', err.message);
      res.status(500).json({ error: 'Server error', details: err.message });
    } 
    else if (result.affectedRows === 0) 
    {
      res.status(404).json({ error: 'Reader not found' });
    } 
    else 
    {
      res.json({ message: 'Reader successfully updated' });
    }
  });
};
  
const getReaderById = (req, res) => 
{
  const readerId = req.params.readerId;
  const sql = 'SELECT * FROM readers WHERE id = ?';
  db.query(sql, [readerId], (err, results) => 
  {
    if (err) 
    {
      console.error('Request execution error:', err.message);
      res.status(500).json({ error: 'Server error', details: err.message });
    } 
    else if (results.length === 0) 
    {
      res.status(404).json({ error: 'Reader not found' });
    } 
    else 
    {
      res.json(results[0]);
    }
  });
  console.log('Executing query:', sql, [readerId]);
};
  

module.exports = { getAllReaders, getReaderById, updateReader, addReader };
