import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function LoansEditingPage() 
{
  const { loanId } = useParams();
  const navigate = useNavigate();

  const [readerId, setReaderId] = useState('');
  const [bookId, setBookId] = useState('');
  const [loanDate, setLoanDate] = useState('');
  const [returnDate, setReturnDate] = useState('');

  useEffect(() => 
    {
    if (loanId) 
    {
      axios.get(`http://localhost:3000/loans/${loanId}`)
        .then(response => 
        {
          const loan = response.data;
          setReaderId(loan.reader_id);
          setBookId(loan.book_id);
          setLoanDate(loan.loan_date);
          setReturnDate(loan.return_date || '');
        })
        .catch(error => 
        {
          console.error('Error loading position data:', error);
        });
    }
  }, [loanId]);

  const handleSubmit = (e) => 
    {
    e.preventDefault();
    const loanData = { reader_id: readerId, book_id: bookId, loan_date: loanDate, return_date: returnDate };

    const request = loanId
      ? axios.put(`http://localhost:3000/loans/${loanId}`, loanData)
      : axios.post('http://localhost:3000/loans', loanData);

    request
      .then(() => 
    {
        navigate('/loans');
      })
      .catch(error => 
    {
        console.error('Error saving position data:', error);
      });
  };

  return (
    <div>
      <h1>{loanId ? 'Edit position' : 'Add new position'}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Reader ID:</label>
          <input type="number" value={readerId} onChange={(e) => setReaderId(e.target.value)} required />
        </div>
        <div>
          <label>Book ID:</label>
          <input type="number" value={bookId} onChange={(e) => setBookId(e.target.value)} required />
        </div>
        <div>
          <label>Date of issue:</label>
          <input type="date" value={loanDate} onChange={(e) => setLoanDate(e.target.value)} required />
        </div>
        <div>
          <label>Return date:</label>
          <input type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} />
        </div>
        <button type="submit">{loanId ? 'Save changes' : 'Add position'}</button>
      </form>
    </div>
  );
}

export default LoansEditingPage;
