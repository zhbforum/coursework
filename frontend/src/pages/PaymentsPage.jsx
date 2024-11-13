import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function PaymentsPage() {
  const [payments, setPayments] = useState([]);

  useEffect(() => 
  {
    axios.get('http://localhost:3000/payments')
      .then(response => 
      {
        setPayments(response.data);
      })
      .catch(error => 
      {
        console.error('Error while receiving payment data:', error);
      });
  }, []);

  return (
    <div>
      <h1>List of payments</h1>
      <ul>
        {payments.map(payment => (
          <li key={payment.payment_id}>
            Reader ID: {payment.reader_id} - Amount: {payment.amount}
            <Link to={`/payments/editing/${payment.payment_id}`}>
              <button>Edit</button>
            </Link>
          </li>
        ))}
      </ul>
      <Link to="/payments/editing">
        <button>Add new payment</button>
      </Link>
    </div>
  );
}

export default PaymentsPage;
