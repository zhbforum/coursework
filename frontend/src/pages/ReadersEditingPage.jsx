import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function ReadersEditingPage() 
{
  const { readerId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => 
 {
    if (readerId) 
    {
      axios.get(`http://localhost:3000/readers/${readerId}`)
        .then(response => 
        {
          const reader = response.data;
          setName(reader.name);
          setEmail(reader.email);
          setPhone(reader.phone);
        })
        .catch(error => 
        {
          console.error('Error loading reader data:', error);
        });
    }
  }, [readerId]);

  const handleSubmit = (e) => 
    {
    e.preventDefault();
    const readerData = { name, email, phone };

    const request = readerId
      ? axios.put(`http://localhost:3000/readers/${readerId}`, readerData)
      : axios.post('http://localhost:3000/readers', readerData);

    request
      .then(() => 
    {
        navigate('/readers');
      })
      .catch(error => 
    {
        console.error('Error saving reader data:', error);
      });
  };

  return (
    <div>
      <h1>{readerId ? 'Edit reader' : 'Add new reader'}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Telephone number:</label>
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </div>
        <button type="submit">{readerId ? 'Save changes' : 'Add reader'}</button>
      </form>
    </div>
  );
}

export default ReadersEditingPage;
