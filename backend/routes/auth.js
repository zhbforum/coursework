const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../config/db');

const SECRET_KEY = 'your_secret_key';

router.post('/login', (req, res) => 
{
    const { username, password } = req.body;

    const sql = 'SELECT * FROM users WHERE username = ?';
    db.query(sql, [username], (err, results) => 
    {
        if (err) 
        {
            console.error('Ошибка базы данных:', err.message);
            return res.status(500).json({ message: 'Ошибка сервера' });
        }

        if (results.length === 0 || results[0].password !== password) 
        {
            return res.status(401).json({ message: 'Неверное имя пользователя или пароль' });
        }

        const user = results[0];
        const token = jwt.sign({ username: user.username, role: user.role }, SECRET_KEY);
        res.json({ token });
    });
});

module.exports = router;
