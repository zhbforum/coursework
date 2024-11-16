import React from 'react';
import { Link } from 'react-router-dom';

function AdminDashboard() 
{
  return (
    <div>
      <h1>Административная панель</h1>
      <p>Добро пожаловать в панель администратора!</p>
      <ul>
        <li>
          <Link to="/books/editing">Управление книгами</Link>
        </li>
        <li>
          <Link to="/authors/editing">Управление авторами</Link>
        </li>
        <li>
          <Link to="/genres/editing">Управление жанрами</Link>
        </li>
        <li>
          <Link to="/readers/editing">Управление читателями</Link>
        </li>
        <li>
          <Link to="/loans/editing">Управление займами</Link>
        </li>
        <li>
          <Link to="/payments/editing">Управление платежами</Link>
        </li>
      </ul>
    </div>
  );
}

export default AdminDashboard;
