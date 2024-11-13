import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function GenresEditingPage() 
{
  const { genreId } = useParams();
  const navigate = useNavigate();

  const [genreName, setGenreName] = useState('');

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

  return (
    <div>
      <h1>{genreId ? 'Edit genre' : 'Add new genre'}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Genre name:</label>
          <input type="text" value={genreName} onChange={(e) => setGenreName(e.target.value)} required />
        </div>
        <button type="submit">{genreId ? 'Save changes' : 'Add genre'}</button>
      </form>
    </div>
  );
}

export default GenresEditingPage;
