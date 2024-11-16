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
      {loans.length === 0 ? (
        <p>No loans found.</p> 
      ) : (
        <ul>
          {loans
            .map(loan => {
              const formattedDate = new Date(loan.loan_date).toLocaleDateString('en-GB'); 
  
              return (
                <li key={loan.id} style={{ marginBottom: '10px' }}>
                  <div>Reader: {loan.reader_name} - Book: {loan.book_title}</div>
                  <div>Date of Issue: {formattedDate} - Fine: ${loan.fine}</div>
                  <Link to={`/loans/editing/${loan.id}`}>
                    <button>Edit</button>
                  </Link>
                </li>
              );
            })}
        </ul>
      )}
      <Link to="/loans/editing">
        <button>Add a new loan</button>
      </Link>
    </div>
  );  
}  

export default LoansPage;
