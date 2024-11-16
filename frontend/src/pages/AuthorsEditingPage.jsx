import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function AuthorsEditingPage() 
{
  const { authorId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [error, setError] = useState(null); 

  useEffect(() => 
{
    if (authorId) 
    {
      axios.get(`http://localhost:3000/authors/${authorId}`)
        .then(response => 
        {
          const author = response.data;
          setName(author.name);
          setBio(author.bio);
        })
        .catch(error => 
        {
          console.error('Error loading author data:', error);
        });
    }
  }, [authorId]);

  const handleSubmit = (e) => 
    {
    e.preventDefault();
    const authorData = { name, bio };

    const request = authorId
      ? axios.put(`http://localhost:3000/authors/${authorId}`, authorData)
      : axios.post('http://localhost:3000/authors', authorData);

    request
      .then(() => 
    {
        navigate('/authors');
      })
      .catch(error => 
    {
        console.error('Error saving author data:', error);
      });
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this author?')) {
      axios.delete(`http://localhost:3000/authors/${authorId}`)
        .then(() => {
          navigate('/authors'); 
        })
        .catch(error => {
          setError('Error deleting author');
          console.error('Error deleting author:', error);
        });
    }
  };

  return (
    <div class="page">
      <h1>{authorId ? 'Edit author' : 'Add new author'}</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Biography:</label>
          <textarea value={bio} onChange={(e) => setBio(e.target.value)} required />
        </div>
        <div className="button-group">
          <button type="submit">{authorId ? 'Save changes' : 'Add author'}</button>
          {authorId && (
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

export default AuthorsEditingPage;
