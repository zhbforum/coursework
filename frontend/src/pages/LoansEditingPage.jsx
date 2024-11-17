import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function LoansEditingPage() 
{
  const { loanId } = useParams(); // ID займа из URL
  const navigate = useNavigate();

  // Состояния для хранения полей формы
  const [readerId, setReaderId] = useState('');
  const [bookId, setBookId] = useState('');
  const [loanDate, setLoanDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [loanIsReturned, setIsReturned] = useState(false); // Булевое значение
  const [loanFine, setFine] = useState('');

  useEffect(() => 
  {
    if (loanId) // Если ID существует, загружаем данные
    {
      axios.get(`http://localhost:3000/loans/${loanId}`)
        .then(response => 
        {
          const loan = response.data;
          setReaderId(loan.reader_id);
          setBookId(loan.book_id);
          setLoanDate(loan.loan_date ? loan.loan_date.split('T')[0] : ''); // Форматируем дату
          setReturnDate(loan.return_date ? loan.return_date.split('T')[0] : '');
          setIsReturned(loan.is_returned);
          setFine(loan.fine);
        })
        .catch(error => 
        {
          console.error('Error loading loan data:', error);
        });
    }
  }, [loanId]);

  const handleSubmit = (e) => 
  {
    e.preventDefault();

    const loanData = 
    {
      reader_id: readerId,
      book_id: bookId,
      loan_date: loanDate,
      return_date: returnDate,
      is_returned: loanIsReturned,
      fine: loanFine
    };

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
        console.error('Error saving loan data:', error);
      });
  };

  return (
    <div>
      <h1>{loanId ? 'Edit Loan' : 'Add New Loan'}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Reader ID:</label>
          <input 
            type="number" 
            value={readerId} 
            onChange={(e) => setReaderId(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Book ID:</label>
          <input 
            type="number" 
            value={bookId} 
            onChange={(e) => setBookId(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Date of Issue:</label>
          <input 
            type="date" 
            value={loanDate} 
            onChange={(e) => setLoanDate(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Return Date:</label>
          <input 
            type="date" 
            value={returnDate} 
            onChange={(e) => setReturnDate(e.target.value)} 
          />
        </div>
        <div>
          <label>Status:</label>
          <select 
            className="authorgenre-select"
            value={loanIsReturned ? '1' : '0'} 
            onChange={(e) => setIsReturned(e.target.value === '1')}
          >
            <option value="1">Returned</option>
            <option value="0">Not returned</option>
          </select>
        </div>
        <div>
          <label>Fine:</label>
          <input 
            type="number" 
            value={loanFine} 
            onChange={(e) => setFine(e.target.value)} 
            step="0.01" 
          />
        </div>
        <button type="submit">{loanId ? 'Save Changes' : 'Add Loan'}</button>
      </form>
    </div>
  );
}

export default LoansEditingPage;
