import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function AuthorsPage() 
{
  const [authors, setAuthors] = useState([]);

  useEffect(() => 
  {
    axios.get('http://localhost:3000/authors')
      .then(response => 
      {
        setAuthors(response.data);
      })
      .catch(error => 
      {
        console.error('Error while retrieving author data:', error);
      });
  }, []);

  return (
    <div>
      <h1>List of authors</h1>
      <br></br>
      <ul>
        {authors.map(author => 
        (
          <li className="loan-item" key={author.id}>
            <div>
            <span className="bold-text">{author.name}</span>
            </div>
            <Link to={`/authors/editing/${author.id}`}>
              <button className={'buttons'}>Edit</button>
            </Link>
          </li>
        ))}
      </ul>
      <Link to="/authors/editing">
        <button>Add a new author</button>
      </Link>
    </div>
  );
}

export default AuthorsPage;
