import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ReadersPage() {
  const [readers, setReaders] = useState([]);
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [readersData, loansData] = await Promise.all([
          axios.get('http://localhost:3000/readers'),
          axios.get('http://localhost:3000/loans')
        ]);

        setReaders(readersData.data);
        setLoans(loansData.data);
      } catch (error) {
        console.error('Error while retrieving data:', error);
      }
    };

    loadData();
  }, []);

  const getTotalLoans = (readerId) => {
    const readerLoans = loans.filter(loan => loan.reader_id === readerId && loan.is_returned === 0);
    const totalFine = readerLoans.reduce((total, loan) => total + parseFloat(loan.fine || 0), 0);
    return totalFine.toFixed(2); 
  };

  return (
    <div>
      <h1>List of readers</h1>
      <br />
      <ul>
        {readers.map(reader => (
          <li className="loan-item" key={reader.id} style={{ marginBottom: '15px' }}>
            <div>
              <span className="bold-text">{reader.name}</span> <p>- Email: <span className="bold-text">{reader.email}</span></p>
              <p>- Телефон: <span className="bold-text">{reader.phone}</span></p>
              <p>- Total Loans: <span className="bold-text">{getTotalLoans(reader.id)} UAH</span></p>
            </div>
            <Link to={`/readers/editing/${reader.id}`}>
              <button className="buttons">Edit</button>
            </Link>
          </li>
        ))}
      </ul>
      <Link to="/readers/editing">
        <button>Add a new reader</button>
      </Link>
    </div>
  );
}

export default ReadersPage;
