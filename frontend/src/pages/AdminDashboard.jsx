import React from 'react';
import { Link } from 'react-router-dom';

function AdminDashboard() 
{
  return (
    <div>
      <h1>Admin panel</h1>
      <p>Welcome to admin panel!</p>
      <ul>
        <li>
          <Link to="/books/editing">Book management</Link>
        </li>
        <li>
          <Link to="/authors/editing">Author management</Link>
        </li>
        <li>
          <Link to="/genres/editing">Genre management</Link>
        </li>
        <li>
          <Link to="/readers/editing">Reader managment</Link>
        </li>
        <li>
          <Link to="/loans/editing">Loan managment</Link>
        </li>
        <li>
          <Link to="/payments/editing">Payment managment</Link>
        </li>
      </ul>
    </div>
  );
}

export default AdminDashboard;
