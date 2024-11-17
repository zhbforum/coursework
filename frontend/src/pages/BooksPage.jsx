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
      <ul>
        {books.map(book => 
          {
          return (
            <li key={book.id}>
              {book.title} - Available copies: {book.available_copies}
              <Link to={`/books/editing/${book.id}`}>
                <button>Editing</button>
              </Link>
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
