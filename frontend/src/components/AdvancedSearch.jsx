import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdvancedSearch() 
{
  const [query, setQuery] = useState('');
  const [genreId, setGenreId] = useState('');
  const [results, setResults] = useState([]);
  const [genres, setGenres] = useState([]);

  const handleSearch = async (e) => 
  {
    e.preventDefault();
    try 
    {
      const genreFilter = genreId || undefined;
      const response = await axios.get('http://localhost:3000/books/search-with-filters', 
      {
        params: { query, genre: genreFilter },
      });
      setResults(response.data);
    } 
    catch (error) 
    {
      console.error('Error while performing search:', error);
    }
  };

  useEffect(() => 
  {
    axios
      .get('http://localhost:3000/genres')
      .then((response) => 
      {
        setGenres(response.data);
      })
      .catch((error) => 
      {
        console.error('Error while retrieving genre data:', error);
      });
  }, []);

  return (
    <div>
      <h2>Advanced search</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter the title of the book or the name of the author."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select className="genre-select" value={genreId} onChange={(e) => setGenreId(e.target.value)}>
          <option value="">All genres</option>
          {genres.map((genre) => 
          (
            <option key={genre.id} value={genre.genre_name}>
              {genre.genre_name}
            </option>
          ))}
        </select>
        <button type="submit">Search</button>
      </form>

      <div>
        <h3>Result of search:</h3>
        <div className="card-container">
          {results.map((result) => 
          (
            <div className="card" key={result.book_id}>
              <h4>{result.title}</h4>
              <p><strong>Author:</strong> {result.author_name}</p>
              <p><strong>Genre:</strong> {result.genre_name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdvancedSearch;
