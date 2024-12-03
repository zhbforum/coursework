const jwt = require('jsonwebtoken');
const db = require('../config/db');

const secretKey = 'your_secret_key';

async function login(req, res) 
{
    const { name, password } = req.body;
    const sql = 'SELECT * FROM users WHERE name = ? AND password = SHA2(?, 256)';
    
    db.query(sql, [name, password], (err, results) => 
    {
        if (err) return res.status(500).json({ error: 'Database error' });

        if (results.length === 0) 
        {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const user = results[0];
        const token = jwt.sign({ user_id: user.user_id, role: user.role }, secretKey, { expiresIn: '1h' });

        res.json({ token });
    });
}

function checkRole(role) 
{
    return (req, res, next) => 
    {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({ error: 'No token provided' });

        jwt.verify(token, secretKey, (err, decoded) => 
        {
            if (err) return res.status(403).json({ error: 'Invalid token' });
            if (decoded.role !== role) return res.status(403).json({ error: 'Access denied' });
            next();
        });
    };
}

module.exports = { login, checkRole };
