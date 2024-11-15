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

const updateLoan = (req, res) => 
{
  const loanId = req.params.loanId;
  const { reader_id, book_id, loan_date } = req.body;
  const sql = 'UPDATE loans SET reader_id = ?, book_id = ?, loan_date = ? WHERE id = ?';
  db.query(sql, [reader_id, book_id, loan_date, loanId], (err, result) => 
  {
    if (err) 
    {
      console.error('Request execution error:', err.message);
      res.status(500).json({ error: 'Server error', details: err.message });
    } 
    else if (result.affectedRows === 0) 
    {
      res.status(404).json({ error: 'Loan not found' });
    } 
    else 
    {
      res.json({ message: 'Loan successfully updated' });
    }
  });
};

const getLoanById = (req, res) => 
{
  const loanId = req.params.loanId;
  const sql = 'SELECT * FROM loans WHERE id = ?';
  db.query(sql, [loanId], (err, results) => 
  {
    if (err) 
    {
      console.error('Request execution error:', err.message);
      res.status(500).json({ error: 'Server error', details: err.message });
    } 
    else if (results.length === 0) 
    {
      res.status(404).json({ error: 'Loan not found' });
    } 
    else 
    {
      res.json(results[0]);
    }
  });
  console.log('Executing query:', sql, [loanId]);
};


module.exports = { getAllLoans, updateLoan, getLoanById, addLoan };
