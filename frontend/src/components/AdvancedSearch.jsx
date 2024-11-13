import React, { useState } from 'react';
import axios from 'axios';

function AdvancedSearch() {
  const [query, setQuery] = useState('');
  const [genre, setGenre] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:3000/books/search-with-filters', {
        params: { query, genre },
      });
      setResults(response.data);
    } catch (error) {
      console.error('Ошибка при выполнении поиска:', error);
    }
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
        <select value={genre} onChange={(e) => setGenre(e.target.value)}>
          <option value="">All genres</option>
          <option value="Fantastic">Fantastic</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Classic">Classic</option>
        </select>
        <button type="submit">Search</button>
      </form>

      <div>
        <h3>Result of search:</h3>
        <ul>
          {results.map((result) => 
          (
            <li key={result.book_id}>
              {result.title} — Author: {result.author_name} — Genre: {result.genre_name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AdvancedSearch;
