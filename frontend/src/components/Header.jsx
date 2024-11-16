import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <Link to="/" className="logo">
        <div className="header-logo">Library Management</div>
      </Link>
      <nav>
        <ul>
          <li><Link to="/advanced-search">Search</Link></li>
          <li><Link to="/books">Books</Link></li>
          <li><Link to="/authors">Authors</Link></li>
          <li><Link to="/readers">Readers</Link></li>
          <li><Link to="/loans">Loans</Link></li>
          <li><Link to="/payments">Payments</Link></li>
          <li><Link to="/genres">Genres</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
