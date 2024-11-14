const db = require('../config/db');

const getAllBooks = (req, res) => 
{
  const sql = 'SELECT * FROM books';
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

const getBookById = (req, res) => 
{
  const bookId = req.params.bookId;
  const sql = 'SELECT * FROM books WHERE id = ?';
  db.query(sql, [bookId], (err, results) => 
  {
    if (err) 
    {
      console.error('Request execution error:', err.message);
      res.status(500).json({ error: 'Server error', details: err.message });
    } 
    else if (results.length === 0) 
    {
      res.status(404).json({ error: 'Book not found' });
    } 
    else 
    {
      res.json(results[0]);
    }
  });

  console.log('Executing query:', sql, [bookId]);
};

const addBook = (req, res) => 
{
  const { title, author_id, genre_id, total_copies, available_copies } = req.body;

  const sql = `
    INSERT INTO books (title, author_id, genre_id, total_copies, available_copies)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [title, author_id, genre_id, total_copies, available_copies], (err, result) => 
  {
    if (err) 
    {
      console.error('Request execution error:', err.message);
      res.status(500).json({ error: 'Server error', details: err.message });
    } 
    else 
    {
      res.status(201).json({ message: 'Book added successfully', bookId: result.insertId });
    }
  });
};

const updateBook = (req, res) => 
{
  const bookId = req.params.bookId;
  const { title, author_id, genre_id, total_copies, available_copies } = req.body;
  const sql = 'UPDATE books SET title = ?, author_id = ?, genre_id = ?, total_copies = ?, available_copies = ? WHERE id = ?';
  db.query(sql, [title, author_id, genre_id, total_copies, available_copies, bookId], (err, result) => 
  {
  
    if (err) 
    {
      console.error('Request execution error:', err.message);
      res.status(500).json({ error: 'Server error', details: err.message });
    } 
    else if (result.affectedRows === 0) 
    {
      res.status(404).json({ error: 'Book not found' });
    } 
    else 
    {
      res.json({ message: 'Book successfully updated' });
    }
  });

};

const searchBooks = (req, res) => {
  const { title, author } = req.query;
  let sql = 'SELECT * FROM books WHERE 1=1';
  const params = [];

  if (title) {
    sql += ' AND title LIKE ?';
    params.push(`%${title}%`);
  }

  if (author) {
    sql += ' AND author_id IN (SELECT id FROM authors WHERE name LIKE ?)';
    params.push(`%${author}%`);
  }

  db.query(sql, params, (err, results) => {
    if (err) {
      console.error('Request execution error:', err.message);
      res.status(500).json({ error: 'Server error' });
    } else {
      res.json(results);
    }
  });
};


const searchWithFilters = (req, res) => {
  const { query, genre } = req.query; 
  let sql = `
    SELECT books.*, authors.name AS author_name, genres.genre_name
    FROM books
    JOIN authors ON books.author_id = authors.id
    JOIN genres ON books.genre_id = genres.id
    WHERE (books.title LIKE ? OR authors.name LIKE ?)
  `;
  const params = [`%${query}%`, `%${query}%`];

  if (genre) {
    sql += ' AND genres.genre_name = ?';
    params.push(genre);
  }

  db.query(sql, params, (err, results) => {
    if (err) {
      console.error('Ошибка выполнения запроса:', err.message);
      res.status(500).json({ error: 'Ошибка сервера' });
    } else {
      res.json(results);
    }
  });
};

module.exports = { searchBooks, getAllBooks, updateBook, getBookById, addBook, searchWithFilters};
