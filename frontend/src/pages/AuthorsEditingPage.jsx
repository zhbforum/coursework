import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function AuthorsEditingPage() 
{
  const { authorId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [bio, setBio] = useState('');

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

  return (
    <div>
      <h1>{authorId ? 'Edit author' : 'Add new author'}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Biography:</label>
          <textarea value={bio} onChange={(e) => setBio(e.target.value)} required />
        </div>
        <button type="submit">{authorId ? 'Save changes' : 'Add author'}</button>
      </form>
    </div>
  );
}

export default AuthorsEditingPage;
