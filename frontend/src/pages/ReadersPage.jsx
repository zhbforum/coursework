// src/pages/ReadersPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ReadersPage() {
  const [readers, setReaders] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/readers')
      .then(response => 
      {
        setReaders(response.data);
      })
      .catch(error => 
      {
        console.error('Error while retrieving reader data:', error);
      });
  }, []);

  return (
    <div>
      <h1>List of readers</h1>
      <ul>
        {readers.map(reader => (
          <li key={reader.id}>
            {reader.name} - Email: {reader.email} - Телефон: {reader.phone}
            <Link to={`/readers/editing/${reader.id}`}>
              <button>Edit</button>
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
