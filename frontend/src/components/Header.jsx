import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; 
import './Header.css';

function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      try {
        const decodedToken = jwtDecode(token); 
        setIsAdmin(decodedToken.role === 'admin'); 
      } catch (error) {
        console.error('Error decoding token:', error);
        setIsAuthenticated(false); 
        localStorage.removeItem('token'); 
        navigate('/login'); 
      }
    } else {
      setIsAuthenticated(false); 
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setIsAdmin(false);
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="logo-container">
        <Link to="/" className="logo">
          <div className="header-logo">Library Management</div>
        </Link>
        <div className="auth-text">
          {isAuthenticated ? (
            <span onClick={handleLogout} style={{ cursor: 'pointer' }}>Exit</span>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </div>

      <nav>
        <ul>
          <li><Link to="/advanced-search">Search</Link></li>
          <li><Link to="/books">Books</Link></li>
          <li><Link to="/authors">Authors</Link></li>
          {isAdmin && (
            <>
              <li><Link to="/readers">Readers</Link></li>
              <li><Link to="/loans">Loans</Link></li>
              <li><Link to="/payments">Payments</Link></li>
            </>
          )}

          <li><Link to="/genres">Genres</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
