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

module.exports = { getAllReaders, addReader };
