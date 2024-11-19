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
        <li className="loan-item" key={genre.id}>
          <div>
          <br></br>
          <span className="bold-text">{genre.genre_name}</span>
          </div>
          <Link to={`/genres/editing/${genre.id}`}>
            <button className={'buttons'}>Edit</button>
          </Link>
        </li>
      ))}
    </ul>
    <br></br>
    <Link to="/genres/editing">
      <button>Add a new genre</button>
    </Link>
  </div>
  );
}

export default GenresPage;
