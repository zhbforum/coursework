const mysql = require('mysql2');

const db = mysql.createConnection
({
  host: '127.127.126.26', 
  port: 3306,
  user: 'root',
  password: '',
  database: 'semestr_work',
});

db.connect((err) => 
{
  if (err) 
  {
    console.error('Error connecting to database:', err);
  } 
  else 
  {
    console.log('Database connection successful!');
  }
});

module.exports = db;
