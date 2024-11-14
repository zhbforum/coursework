// src/pages/BooksEditingPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function BooksEditingPage() {
  const { bookId } = useParams(); // Получаем bookId из параметров URL
  const navigate = useNavigate(); // Используем navigate для перенаправления

  // Состояния для хранения данных книги
  const [title, setTitle] = useState('');
  const [authorId, setAuthorId] = useState('');
  const [genreId, setGenreId] = useState('');
  const [totalCopies, setTotalCopies] = useState('');
  const [availableCopies, setAvailableCopies] = useState('');
  const [error, setError] = useState(null); // Для отображения ошибок

  // Эффект для загрузки данных книги, если bookId есть
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

  // Обработчик отправки формы
  const handleSubmit = (e) => {
    e.preventDefault(); // Предотвращаем перезагрузку страницы при отправке формы

    const bookData = {
      title,
      author_id: authorId,
      genre_id: genreId,
      total_copies: totalCopies,
      available_copies: availableCopies,
    };

    const request = bookId
      ? axios.put(`http://localhost:3000/books/${bookId}`, bookData) // Если bookId есть, делаем PUT запрос
      : axios.post('http://localhost:3000/books', bookData); // Если нет, делаем POST запрос для добавления новой книги

    request
      .then(() => {
        navigate('/books'); // После успешного запроса перенаправляем на страницу списка книг
      })
      .catch(error => {
        setError('Error saving book data');
        console.error('Error saving book data:', error);
      });
  };

  return (
    <div className="container">
      <h1>{bookId ? 'Edit book' : 'Add a new book'}</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Отображаем ошибки */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Author ID:</label>
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
