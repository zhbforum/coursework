import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function LoansPage() 
{
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/loans')
      .then(response => 
      {
        setLoans(response.data);
      })
      .catch(error => 
      {
        console.error('Error while retrieving position data:', error);
      });
  }, []);

  return (
    <div>
      <h1>List of loans</h1>
      <ul>
        {loans.map(loan => 
        (
          <li key={loan.loan_id}>
            Reader ID: {loan.reader_id} - Book ID: {loan.book_id} - date of issue: {loan.loan_date}
            <Link to={`/loans/editing/${loan.loan_id}`}>
              <button>Edit</button>
            </Link>
          </li>
        ))}
      </ul>
      <Link to="/loans/editing">
        <button>Add a new loan</button>
      </Link>
    </div>
  );
}

export default LoansPage;
