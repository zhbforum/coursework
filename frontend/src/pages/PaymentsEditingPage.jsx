import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function PaymentsEditingPage() 
{
  const { paymentId } = useParams();
  const navigate = useNavigate();

  const [readerId, setReaderId] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentDate, setPaymentDate] = useState('');
  const [error, setError] = useState(null); 

  useEffect(() => 
    {
    if (paymentId) 
    {
      axios.get(`http://localhost:3000/payments/${paymentId}`)
        .then(response => 
        {
          const payment = response.data;
          setReaderId(payment.reader_id);
          setAmount(payment.amount);
          setPaymentDate(payment.payment_date);
        })
        .catch(error => 
        {
          console.error('Error loading payment data:', error);
        });
    }
  }, [paymentId]);

  const handleSubmit = (e) => 
    {
    e.preventDefault();
    const paymentData = { reader_id: readerId, amount, payment_date: paymentDate };

    const request = paymentId
      ? axios.put(`http://localhost:3000/payments/${paymentId}`, paymentData)
      : axios.post('http://localhost:3000/payments', paymentData);

    request
      .then(() => {
        navigate('/payments');
      })
      .catch(error => 
    {
        console.error('Error saving payment data:', error);
      });
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this book?')) {
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
        <div>
          <label>Reader ID:</label>
          <input type="number" value={readerId} onChange={(e) => setReaderId(e.target.value)} required />
        </div>
        <div>
          <label>Amount:</label>
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
        </div>
        <div>
          <label>Payment date:</label>
          <input type="date" value={paymentDate} onChange={(e) => setPaymentDate(e.target.value)} required />
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
