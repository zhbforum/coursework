// src/pages/BooksEditingPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function BooksEditingPage() 
{
  const { bookId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [authorId, setAuthorId] = useState('');
  const [genreId, setGenreId] = useState('');
  const [totalCopies, setTotalCopies] = useState('');
  const [availableCopies, setAvailableCopies] = useState('');

  useEffect(() => 
    {
    if (bookId) 
    {
      axios.get(`http://localhost:3000/books/${bookId}`)
        .then(response => 
        {
          const book = response.data;
          setTitle(book.title);
          setAuthorId(book.author_id);
          setGenreId(book.genre_id);
          setTotalCopies(book.total_copies);
          setAvailableCopies(book.available_copies);
        })
        .catch(error => 
        {
          console.error('Error loading book data:', error);
        });
    }
  }, [bookId]);

  const handleSubmit = (e) => 
    {
    e.preventDefault();
    const bookData = { title, author_id: authorId, genre_id: genreId, total_copies: totalCopies, available_copies: availableCopies };

    const request = bookId
      ? axios.put(`http://localhost:3000/books/${bookId}`, bookData)
      : axios.post('http://localhost:3000/books', bookData);

    request
      .then(() => {
        navigate('/books');
      })
      .catch(error => 
    {
        console.error('Error saving book data:', error);
      });
  };

  return (
    <div className="container">
      <h1>{bookId ? 'Edit book' : 'Add a new book'}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Author ID :</label>
          <input type="number" value={authorId} onChange={(e) => setAuthorId(e.target.value)} required />
        </div>
        <div>
          <label>Genre ID:</label>
          <input type="number" value={genreId} onChange={(e) => setGenreId(e.target.value)} required />
        </div>
        <div>
          <label>Total copies:</label>
          <input type="number" value={totalCopies} onChange={(e) => setTotalCopies(e.target.value)} required />
        </div>
        <div>
          <label>Available copies:</label>
          <input type="number" value={availableCopies} onChange={(e) => setAvailableCopies(e.target.value)} required />
        </div>
        <button type="submit">{bookId ? 'Save changes' : 'Add book'}</button>
      </form>
    </div>
  );
}

export default BooksEditingPage;
