import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdvancedSearch() {
  const [query, setQuery] = useState('');
  const [genreId, setGenreId] = useState('');
  const [results, setResults] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [authorBio, setAuthorBio] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const genreFilter = genreId || undefined;
      const response = await axios.get('http://localhost:3000/books/search-with-filters', {
        params: { query, genre: genreFilter },
      });
      const filteredResults = response.data.filter((book) => book.available_copies > 0);
      setResults(filteredResults);
    } catch (error) {
      console.error('Error while performing search:', error);
    }
  };

  useEffect(() => {
    axios
      .get('http://localhost:3000/genres')
      .then((response) => {
        setGenres(response.data);
      })
      .catch((error) => {
        console.error('Error while retrieving genre data:', error);
      });
  }, []);

  const getImagePath = (book_image_name) => {
    try {
      return require(`../assets/${book_image_name}`);
    } catch (err) {
      console.error(`Image not found: ${book_image_name}`);
      return '';
    }
  };

  const handleAuthorClick = async (authorName) => {
    try {
      const response = await axios.get('http://localhost:3000/authors');
      console.log('Full API Response:', response.data);
      const author = response.data.find((a) => a.name === authorName);
      if (author) {
        setSelectedAuthor(authorName);
        setAuthorBio(author.bio);
      } else {
        console.error('Author not found in response.');
      }
    } catch (error) {
      console.error('Error while retrieving author bio:', error);
    }
  };
  

  const closeAuthorBio = () => {
    setSelectedAuthor(null);
    setAuthorBio(null);
  };

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
          {genres.map((genre) => (
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
          {results.length > 0 ? (
            results.map((result) => (
              <div className="card" key={result.id}>
                <img
                  src={getImagePath(result.book_image_name)}
                  alt={result.title}
                  style={{ width: '100px', height: '150px' }}
                />
                <h4>{result.title}</h4>
                <p>
                  <strong>Author:</strong>{' '}
                  <span
                    className="clickable-author"
                    onClick={() => handleAuthorClick(result.author_name)}
                    style={{ color: 'blue', cursor: 'pointer' }}
                  >
                    {result.author_name}
                  </span>
                </p>
                <p><strong>Genre:</strong> {result.genre_name}</p>
                <p><strong>Available Copies:</strong> {result.available_copies}</p>
              </div>
            ))
          ) : (
            <p>No books available with the selected filters.</p>
          )}
        </div>
      </div>

      {selectedAuthor && authorBio && (
        <div className="author-bio-container">
          <div className="author-bio-content">
            <h3>{selectedAuthor}</h3>
            <p>{authorBio}</p>
            <button onClick={closeAuthorBio}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdvancedSearch;
