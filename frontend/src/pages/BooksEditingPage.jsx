import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const InputField = ({ label, type, value, onChange, required = false }) => 
{
  return (
    <div>
      <label>{label}:</label>
      <input type={type} value={value} onChange={onChange} required={required} />
    </div>
  );
};

const SelectField = ({ label, value, onChange, options, required = false }) => 
{
  return (
    <div>
      <label>{label}:</label>
      <select value={value} onChange={onChange} required={required}>
        <option value="" disabled>Select {label.toLowerCase()}</option>
        {options.map(option => 
        {
          return (
            <option key={option.id} value={option.id}>
              {option.name || option.genre_name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

const fetchBook = async (id) => 
{
  try 
  {
    const response = await axios.get(`http://localhost:3000/books/${id}`);
    return response.data;
  } 
  catch (error) 
  {
    throw new Error('Error loading book data');
  }
};

const fetchAuthors = async () => 
{
  try 
  {
    const response = await axios.get('http://localhost:3000/authors');
    return response.data;
  } 
  catch (error) 
  {
    throw new Error('Error loading authors');
  }
};

const fetchGenres = async () => 
{
  try 
  {
    const response = await axios.get('http://localhost:3000/genres');
    return response.data;
  } 
  catch (error) 
  {
    throw new Error('Error loading genres');
  }
};

function BooksEditingPage() 
{
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

  useEffect(() => 
  {
    const loadData = async () => 
    {
      try 
      {
        if (bookId) 
        {
          const book = await fetchBook(bookId);
          setTitle(book.title);
          setAuthorId(book.author_id);
          setGenreId(book.genre_id);
          setTotalCopies(book.total_copies);
          setAvailableCopies(book.available_copies);
        }
        setAuthors(await fetchAuthors());
        setGenres(await fetchGenres());
      } 
      catch (err) 
      {
        setError(err.message);
        console.error(err);
      }
    };
    loadData();
  }, [bookId]);

  const handleSubmit = async (e) => 
  {
    e.preventDefault();

    const bookData = 
    {
      title,
      author_id: authorId,
      genre_id: genreId,
      total_copies: totalCopies,
      available_copies: availableCopies,
    };

    try 
    {
      if (bookId) 
      {
        await axios.put(`http://localhost:3000/books/${bookId}`, bookData);
      } 
      else 
      {
        await axios.post('http://localhost:3000/books', bookData);
      }
      navigate('/books');
    } 
    catch (err) 
    {
      setError('Error saving book data');
      console.error(err);
    }
  };

  const handleDelete = async () => 
  {
    if (window.confirm('Are you sure you want to delete this book?')) 
    {
      try 
      {
        await axios.delete(`http://localhost:3000/books/${bookId}`);
        navigate('/books');
      } 
      catch (err) 
      {
        setError('Error deleting book');
        console.error(err);
      }
    }
  };

  return (
    <div>
      <h1>{bookId ? 'Edit book' : 'Add a new book'}</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-fields">
          <InputField
            label="Title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <SelectField
            label="Author"
            value={authorId}
            onChange={(e) => setAuthorId(e.target.value)}
            options={authors}
            required
          />
          <SelectField
            label="Genre"
            value={genreId}
            onChange={(e) => setGenreId(e.target.value)}
            options={genres}
            required
          />
          <InputField
            label="Total copies"
            type="number"
            value={totalCopies}
            onChange={(e) => setTotalCopies(e.target.value)}
            required
          />
          <InputField
            label="Available copies"
            type="number"
            value={availableCopies}
            onChange={(e) => setAvailableCopies(e.target.value)}
            required
          />
        </div>
        <div className="button-group">
          <button type="submit">{bookId ? 'Save changes' : 'Add book'}</button>
          {bookId && 
          (
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
