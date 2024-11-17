import React, { useState } from 'react';
import axios from 'axios';

function SearchBooks() 
{
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => 
{
    e.preventDefault();
    try 
    {
      const response = await axios.get('http://localhost:3000/books/search', 
    {
        params: { title, author },
    });
    setResults(response.data);
    } 
    catch (error) 
    {
      console.error('Error when searching for books:', error);
    }
  };

  return (
    <div>
      <h2>Search books</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Name of books"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <ul>
        {results.map((book) => 
        (
          <li key={book.id}>
            {book.title} — Author ID: {book.author_id}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchBooks;
