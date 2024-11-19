import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function LoansPage() {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/loans')
      .then(response => {
        setLoans(response.data);
      })
      .catch(error => {
        console.error('Error while retrieving position data:', error);
      });
  }, []);

  return (
    <div>
      <h1>List of loans</h1>
      <br></br>
      {loans.length === 0 ? (
        <p>No loans found.</p>
      ) : (
        <ul>
          {loans.map(loan => {
            const formattedDate = new Date(loan.loan_date).toLocaleDateString('en-GB'); 

            return (
              <li className = "loan-item" key={loan.id} style={{ marginBottom: '15px' }}>
                <div>
                  Reader: <span className="bold-text">{loan.reader_name}</span>
                </div>
                <div>
                  Book: <span className="bold-text">{loan.book_title}</span>
                </div>
                <div>
                  Date of Issue: <span className="bold-text">{formattedDate}</span>
                </div>
                <div>
                  Fine: <span className="bold-text">₴{loan.fine}</span>
                </div>
                <Link to={`/loans/editing/${loan.id}`}>
                  <button className={'buttons'}>Edit</button> 
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
