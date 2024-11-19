import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function BooksPage() 
{
  const [books, setBooks] = useState([]);

  useEffect(() => 
  {
    axios.get('http://localhost:3000/books')
      .then(response => 
      {
        setBooks(response.data);
      })
      .catch(error => 
      {
        console.error('Error when retrieving book data::', error);
      });
  }, []);

  return (
    <div>
      <h1>List of books</h1>
      <br></br>
      <ul>
        {books.map(book => 
          {
          return (
            <li className="loan-item" key={book.id} style={{ marginBottom: '15px' }}>
              <div>
              <span className="bold-text">{book.title}</span>
              <p>- Available copies: <span className="bold-text">{book.available_copies}</span></p> 
              <p>- Total copies: <span className="bold-text">{book.total_copies}</span></p>
              <Link to={`/books/editing/${book.id}`}>
                <button className='buttons'>Edit</button>
              </Link>
              </div> 
            </li>
          );
          })}
      </ul>
      <Link to="/books/editing">
        <button>Add a new book</button>
      </Link>
    </div>
  );
}

export default BooksPage;
