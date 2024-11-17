const express = require('express');
const cors = require('cors');
const db = require('./config/db');
const booksRoutes = require('./routes/books');
const loansRoutes = require('./routes/loans');
const readersRoutes = require('./routes/readers');
const authorsRoutes = require('./routes/authors');
const paymentsRoutes = require('./routes/payments');
const genresRoutes = require('./routes/genres');
const authRoutes = require('./routes/auth');
const jwt = require('jsonwebtoken'); 

const app = express();
const port = 3000;

const SECRET_KEY = 'your_secret_key';

app.use(cors());
app.use(express.json());

app.use('/books', booksRoutes);
app.use('/loans', loansRoutes);
app.use('/readers', readersRoutes);
app.use('/authors', authorsRoutes);
app.use('/payments', paymentsRoutes);
app.use('/genres', genresRoutes);
app.use('/auth', authRoutes);

function authenticateToken(req, res, next) 
{
  const token = req.headers['authorization']?.split(' ')[1];
  console.log('Received Token:', token);

  if (!token) 
{   
    return res.status(401).json({ message: 'Authorization token required' });
}

  jwt.verify(token, SECRET_KEY, (err, user) => 
  {
      if (err) 
      {
        console.error('JWT Error:', err);
        return res.status(403).json({ message: 'Invalid token' });
      }
      req.user = user;
      next();
  });
}

function checkRole(requiredRole) 
{
    return (req, res, next) => 
    {
        const userRole = req.user?.role;
        if (userRole !== requiredRole)
        {
            return res.status(403).json({ message: 'Access denied' });
        }
        next();
    };
}

app.post('/admin/books', authenticateToken, checkRole('admin'), (req, res) => 
{
    const { title, author_id, genre_id, total_copies } = req.body;

    const sql = `
        INSERT INTO books (title, author_id, genre_id, total_copies, available_copies)
        VALUES (?, ?, ?, ?, ?)
    `;
    const available_copies = total_copies;

    db.query(sql, [title, author_id, genre_id, total_copies, available_copies], (err, result) => 
    {
        if (err) 
        {
            console.error('Request execution error:', err.message);
            return res.status(500).json({ error: 'Server error', details: err.message });
        }
        res.status(201).json({ message: 'Book added successfully', bookId: result.insertId });
    });
});

const adminToken = jwt.sign({ username: 'admin', role: 'admin' }, 'your_secret_key');
const userToken = jwt.sign({ username: 'user', role: 'user' }, 'your_secret_key');

console.log('Admin Token:', adminToken);
console.log('User Token:', userToken);

app.listen(port, () => 
{
    console.log(`Server is starting on http://localhost:${port}`);
});
