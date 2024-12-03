import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const SelectField = ({ label, value, onChange, options, required = false }) => {
  return (
    <div>
      <label>{label}:</label>
      <select 
        value={value} 
        onChange={onChange} 
        required={required} 
        className="authorgenre-select"
      >
        <option value="" disabled>Select {label.toLowerCase()}</option>
        {options.map(option => (
          <option key={option.id} value={option.id}>
            {option.name || option.title}
          </option>
        ))}
      </select>
    </div>
  );
};

function LoansEditingPage() {
  const { loanId } = useParams();
  const navigate = useNavigate();

  const [readerId, setReaderId] = useState('');
  const [bookId, setBookId] = useState('');
  const [loanDate, setLoanDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [loanIsReturned, setIsReturned] = useState(false);
  const [loanFine, setFine] = useState('');
  const [readers, setReaders] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => 
      {
      try {
        const [readersData, booksData] = await Promise.all([
          axios.get('http://localhost:3000/readers'),
          axios.get('http://localhost:3000/books'),
        ]);
        setReaders(readersData.data);
        setBooks(booksData.data);

        if (loanId) {
          const loanResponse = await axios.get(`http://localhost:3000/loans/${loanId}`);
          const loan = loanResponse.data;
          setReaderId(loan.reader_id);
          setBookId(loan.book_id);
          setLoanDate(loan.loan_date ? loan.loan_date.split('T')[0] : '');
          setReturnDate(loan.return_date ? loan.return_date.split('T')[0] : '');
          setIsReturned(loan.is_returned);
          setFine(loan.fine);
        }
      } catch (error) {
        setError('Error loading data. Please try again later.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [loanId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const loanData = {
      reader_id: readerId,
      book_id: bookId,
      loan_date: loanDate,
      return_date: returnDate || null,
      is_returned: loanIsReturned,
      fine: loanFine,
    };

    const request = loanId
      ? axios.put(`http://localhost:3000/loans/${loanId}`, loanData)
      : axios.post('http://localhost:3000/loans', loanData);

    request
      .then(() => {
        navigate('/loans');
      })
      .catch((error) => {
        setError('Error saving loan data. Please try again later.');
        console.error(error);
      });
  };

  return (
    <div>
      <h1>{loanId ? 'Edit Loan' : 'Add New Loan'}</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <SelectField
          label="Reader"
          value={readerId}
          onChange={(e) => setReaderId(e.target.value)}
          options={readers}
          required
        />
        <SelectField
          label="Book"
          value={bookId}
          onChange={(e) => setBookId(e.target.value)}
          options={books}
          required
        />
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

