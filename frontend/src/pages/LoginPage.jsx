import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginPage() 
{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => 
    {
        e.preventDefault();
        try 
        {
            const response = await axios.post('http://localhost:3000/auth/login', { username, password });
            localStorage.setItem('token', response.data.token);
            navigate('/admin'); 
            console.log(localStorage.getItem('token'));
        } 
        catch (err) 
        {
            setError('Invalid username or password');
        }
    };

    return (
        <div>
            <h1>Admin Login</h1>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
}

export default LoginPage;
