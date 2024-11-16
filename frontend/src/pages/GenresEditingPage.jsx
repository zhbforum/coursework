import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function GenresEditingPage() 
{
  const { genreId } = useParams();
  const navigate = useNavigate();

  const [genreName, setGenreName] = useState('');
  const [error, setError] = useState(null); 

  useEffect(() => 
{
    if (genreId) 
    {
      axios.get(`http://localhost:3000/genres/${genreId}`)
        .then(response => 
        {
          const genre = response.data;
          setGenreName(genre.genre_name);
        })
        .catch(error => 
        {
          console.error('Error loading genre data:', error);
        });
    }
  }, [genreId]);

const handleSubmit = (e) => 
{
    e.preventDefault();
    const genreData = { genre_name: genreName };

    const request = genreId
      ? axios.put(`http://localhost:3000/genres/${genreId}`, genreData)
      : axios.post('http://localhost:3000/genres', genreData);

    request
      .then(() => 
      {
        navigate('/genres');
      })
      .catch(error => 
      {
        console.error('Error when saving genre data:', error);
      });
  };

  const handleDelete = () => 
  {
    if (window.confirm('Are you sure you want to delete this book?')) {
      axios.delete(`http://localhost:3000/genres/${genreId}`)
        .then(() => {
          navigate('/genres'); 
        })
        .catch(error => {
          setError('Error deleting genre');
          console.error('Error deleting genre:', error);
        });
    }
  };

  return (
    <div>
      <h1>{genreId ? 'Edit genre' : 'Add new genre'}</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Genre name:</label>
          <input type="text" value={genreName} onChange={(e) => setGenreName(e.target.value)} required />
        </div>
        <div className="button-group">
          <button type="submit">{genreId ? 'Save changes' : 'Add genre'}</button>
          {genreId && (
            <button
              type="button"
              className="delete-button"
              onClick={handleDelete}
            >
              Delete genre
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default GenresEditingPage;
