// src/pages/BooksEditingPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function BooksEditingPage() {
  const { bookId } = useParams(); 
  const navigate = useNavigate(); 

  const [title, setTitle] = useState('');
  const [authorId, setAuthorId] = useState('');
  const [genreId, setGenreId] = useState('');
  const [totalCopies, setTotalCopies] = useState('');
  const [availableCopies, setAvailableCopies] = useState('');
  const [error, setError] = useState(null); 

  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);


  useEffect(() => {
    if (bookId) {
      axios.get(`http://localhost:3000/books/${bookId}`)
        .then(response => {
          const book = response.data;
          setTitle(book.title);
          setAuthorId(book.author_id);
          setGenreId(book.genre_id);
          setTotalCopies(book.total_copies);
          setAvailableCopies(book.available_copies);
        })
        .catch(error => {
          setError('Error loading book data');
          console.error('Error loading book data:', error);
        });
    }
  }, [bookId]);

  useEffect(() => {
    axios.get('http://localhost:3000/authors') 
      .then(response => setAuthors(response.data))
      .catch(error => {
        setError('Error loading authors');
        console.error('Error loading authors:', error);
      });
  }, []);

  useEffect(() => 
    {
      axios.get('http://localhost:3000/genres')
        .then(response => 
        {
          setGenres(response.data);
        })
        .catch(error => 
        {
          console.error('Error while retrieving genre data:', error);
        });
    }, []);

  const handleSubmit = (e) => {
    e.preventDefault(); 

    const bookData = {
      title,
      author_id: authorId,
      genre_id: genreId,
      total_copies: totalCopies,
      available_copies: availableCopies,
    };

    const request = bookId
      ? axios.put(`http://localhost:3000/books/${bookId}`, bookData) 
      : axios.post('http://localhost:3000/books', bookData); 

    request
      .then(() => {
        navigate('/books'); 
      })
      .catch(error => {
        setError('Error saving book data');
        console.error('Error saving book data:', error);
      });
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      axios.delete(`http://localhost:3000/books/${bookId}`)
        .then(() => {
          navigate('/books'); 
        })
        .catch(error => {
          setError('Error deleting book');
          console.error('Error deleting book:', error);
        });
    }
  };

  return (
    <div className="container">
      <h1>{bookId ? 'Edit book' : 'Add a new book'}</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-fields">
          <div>
            <label>Title:</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div>
            <label>Author:</label>
            <select value={authorId} onChange={(e) => setAuthorId(e.target.value)} required>
              <option value="" disabled>Select an author</option>
              {authors.map(author => (
                <option key={author.id} value={author.id}>
                  {author.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Genre:</label>
            <select value={genreId} onChange={(e) => setGenreId(e.target.value)} required>
              <option value="" disabled>Select a genre</option>
              {genres.map(genre => (
                <option key={genre.id} value={genre.id}>
                  {genre.genre_name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Total copies:</label>
            <input type="number" value={totalCopies} onChange={(e) => setTotalCopies(e.target.value)} required />
          </div>
          <div>
            <label>Available copies:</label>
            <input type="number" value={availableCopies} onChange={(e) => setAvailableCopies(e.target.value)} required />
          </div>
        </div>
        <div className="button-group">
          <button type="submit">{bookId ? 'Save changes' : 'Add book'}</button>
          {bookId && (
            <button
              type="button"
              className="delete-button"
              onClick={handleDelete}
            >
              Delete book
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default BooksEditingPage;
