const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../config/db');

const SECRET_KEY = 'your_secret_key';

router.post('/login', (req, res) => 
{
    const { name, password } = req.body;

    const sql = 'SELECT * FROM users WHERE name = ?';
    db.query(sql, [name], (err, results) => 
    {
        if (err) 
        {
            console.error('Database Error:', err.message);
            return res.status(500).json({ message: 'Server error' });
        }

        if (results.length === 0 || results[0].password !== password) 
        {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const user = results[0];
        const token = jwt.sign({ name: user.name, role: user.role }, SECRET_KEY);
        res.json({ token });
    });
});

module.exports = router;
