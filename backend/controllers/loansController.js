const db = require('../config/db');

const getAllLoans = (req, res) => 
{
  const sql = 'SELECT * FROM loans';
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

const addLoan = (req, res) => 
{
  const { reader_id, book_id, loan_date } = req.body;
  const sql = `INSERT INTO loans (reader_id, book_id, loan_date) VALUES (?, ?, ?)`;

  db.query(sql, [reader_id, book_id, loan_date], (err, result) => 
  {
    if (err) 
    {
      console.error('Request execution error:', err.message);
      res.status(500).json({ error: 'Server error', details: err.message });
    } 
    else 
    {
      res.status(201).json({ message: 'The loan has been successfully added', loanId: result.insertId });
    }
  });
};

module.exports = { getAllLoans, addLoan };
