const db = require('../config/db');

const getAllPayments = (req, res) => 
{
  const sql = 'SELECT * FROM payments';
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

const getPaymentById = (req, res) => 
{
  const paymentId = req.params.paymentId;
  const sql = 'SELECT * FROM payments WHERE id = ?';
  db.query(sql, [paymentId], (err, results) => 
    {
    if (err) 
    {
      console.error('Request execution error:', err.message);
      res.status(500).json({ error: 'Server error', details: err.message });
    } else if (results.length === 0) 
    {
      res.status(404).json({ error: 'Payment not found' });
    } else 
    {
      res.json(results[0]);
    }
  });
};

const addPayment = (req, res) => 
{
  const { reader_id, amount, payment_date } = req.body;
  const sql = 'INSERT INTO payments (reader_id, amount, payment_date) VALUES (?, ?, ?)';
  db.query(sql, [reader_id, amount, payment_date], (err, result) => 
  {
    if (err) 
    {
      console.error('Request execution error:', err.message);
      res.status(500).json({ error: 'Server error', details: err.message });
    } 
    else 
    {
      res.status(201).json({ message: 'Payment added successfully', paymentId: result.insertId });
    }
  });
};

const updatePayment = (req, res) => 
{
  const paymentId = req.params.paymentId;
  const { reader_id, amount, payment_date } = req.body;
  const sql = 'UPDATE payments SET reader_id = ?, amount = ?, payment_date = ? WHERE id = ?';
  db.query(sql, [reader_id, amount, payment_date, paymentId], (err, result) => 
    {
    if (err) 
    {
      console.error('Request execute error:', err.message);
      res.status(500).json({ error: 'Server error', details: err.message });
    } 
    else if (result.affectedRows === 0) 
    {
      res.status(404).json({ error: 'Payment not found' });
    } 
    else 
    {
      res.json({ message: 'Payment successfully updated' });
    }
  });
};

module.exports = { getAllPayments, getPaymentById, addPayment, updatePayment };
