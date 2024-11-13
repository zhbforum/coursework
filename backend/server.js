const express = require('express');
const cors = require('cors');
const db = require('./config/db');
const booksRoutes = require('./routes/books');
const loansRoutes = require('./routes/loans');
const readersRoutes = require('./routes/readers');
const authorsRoutes = require('./routes/authors');
const paymentsRoutes = require('./routes/payments');
const genresRoutes = require('./routes/genres');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use('/books', booksRoutes);
app.use('/books', booksRoutes);
app.use('/loans', loansRoutes);
app.use('/readers', readersRoutes);
app.use('/authors', authorsRoutes);
app.use('/payments', paymentsRoutes);
app.use('/genres', genresRoutes);

app.listen(port, () => 
{
  console.log(`Server is starting on http://localhost:${port}`);
});
