import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function GenresPage() 
{
  const [genres, setGenres] = useState([]);

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

  return (
    <div>
      <h1>List of genres</h1>
      <ul>
        {genres.map(genre => 
        (
          <li key={genre.id}>
            {genre.genre_name}
            <Link to={`/genres/editing/${genre.id}`}>
              <button>Edit</button>
            </Link>
          </li>
        ))}
      </ul>
      <Link to="/genres/editing">
        <button>Add a new genre</button>
      </Link>
    </div>
  );
}

export default GenresPage;
