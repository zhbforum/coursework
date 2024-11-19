import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ReadersPage() 
{
  const [readers, setReaders] = useState([]);

  useEffect(() => 
  {
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
      <br></br>
      <ul>
        {readers.map(reader => 
        {
          return (
            <li className="loan-item" key={reader.id} style={{ marginBottom: '15px' }}>
              <div>
              <span className="bold-text">{reader.name}</span> <p>- Email: <span className="bold-text">{reader.email}</span></p> 
              <p>- Телефон: <span className="bold-text">{reader.phone}</span></p>
              </div>
              <Link to={`/readers/editing/${reader.id}`}>
                <button className="buttons">Edit</button>
              </Link>
            </li>
          );
        })}
      </ul>
      <Link to="/readers/editing">
        <button>Add a new reader</button>
      </Link>
    </div>
  );
}

export default ReadersPage;
