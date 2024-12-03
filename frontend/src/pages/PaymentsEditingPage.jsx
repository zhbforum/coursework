import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const SelectField = ({ label, value, onChange, options, required = false, type, placeholder = '' }) => {
  const renderOptionText = (option) => {
    if (type === 'reader') {
      return `ID: ${option.id} - ${option.name || 'Unknown Reader'}`; 
    } else if (type === 'book') {
      return `ID: ${option.id} - ${option.book_title || 'Unknown Book'}`; 
    }
    return option.name || 'Unknown'; 
  };

  return (
    <div>
      <label>{label}:</label>
      <select
        value={value}
        onChange={onChange}
        required={required}
        className="authorgenre-select"
      >
        <option value="" disabled>{placeholder || `Select ${label.toLowerCase()}`}</option>
        {options.map(option => (
          <option key={option.id} value={option.id}>
            {renderOptionText(option)}
          </option>
        ))}
      </select>
    </div>
  );
};

function PaymentsEditingPage() {
  const { paymentId } = useParams();
  const navigate = useNavigate();

  const [readerId, setReaderId] = useState('');
  const [loanId, setLoanId] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentDate, setPaymentDate] = useState('');
  const [readers, setReaders] = useState([]);
  const [loans, setLoans] = useState([]);
  const [filteredLoans, setFilteredLoans] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [readersData, loansData] = await Promise.all([
          axios.get('http://localhost:3000/readers'),
          axios.get('http://localhost:3000/loans'),
        ]);

        console.log('Readers Data:', readersData.data);
        console.log('Loans Data:', loansData.data);

        setReaders(readersData.data);
        setLoans(loansData.data);

        if (paymentId) {
          const paymentResponse = await axios.get(`http://localhost:3000/payments/${paymentId}`);
          const payment = paymentResponse.data;
          setReaderId(payment.reader_id);
          setAmount(payment.amount);
          setPaymentDate(payment.payment_date);
          setLoanId(payment.loan_id);
        }
      } catch (error) {
        setError('Error loading data. Please try again later.');
        console.error(error);
      }
    };

    loadData();
  }, [paymentId]);

  useEffect(() => {
    if (readerId) {
      const loansForReader = loans.filter(
        loan => loan.reader_id === parseInt(readerId) && loan.is_returned === 0
      );
      setFilteredLoans(loansForReader);
    } else {
      setFilteredLoans([]);  
    }
  }, [readerId, loans]); 

  const handleSubmit = (e) => {
    e.preventDefault();
    const paymentData = { reader_id: readerId, amount, payment_date: paymentDate, loan_id: loanId };

    const request = paymentId
      ? axios.put(`http://localhost:3000/payments/${paymentId}`, paymentData)
      : axios.post('http://localhost:3000/payments', paymentData);

    request
      .then(() => {
        navigate('/payments');
      })
      .catch(error => {
        setError('Error saving payment data. Please try again later.');
        console.error(error);
      });
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this payment?')) {
      axios.delete(`http://localhost:3000/payments/${paymentId}`)
        .then(() => {
          navigate('/payments');
        })
        .catch(error => {
          setError('Error deleting payment');
          console.error('Error deleting payment:', error);
        });
    }
  };

  return (
    <div>
      <h1>{paymentId ? 'Edit payment' : 'Add a new payment'}</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <SelectField
          label="Reader"
          value={readerId}
          onChange={(e) => setReaderId(e.target.value)}
          options={readers}
          required
          type="reader"
        />
        <SelectField
          label="Loan"
          value={loanId}
          onChange={(e) => setLoanId(e.target.value)}
          options={filteredLoans}
          required
          disabled={!readerId}  
          type="book"
        />
        <div>
          <label>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Payment date:</label>
          <input
            type="date"
            value={paymentDate}
            onChange={(e) => setPaymentDate(e.target.value)}
            required
          />
        </div>
        <div className="button-group">
          <button type="submit">{paymentId ? 'Save changes' : 'Add payment'}</button>
          {paymentId && (
            <button
              type="button"
              className="delete-button"
              onClick={handleDelete}
            >
              Delete payment
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default PaymentsEditingPage;
