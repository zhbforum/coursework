import React from 'react';
import './HomePage.css';

function HomePage() 
{
  return (
    <div className="home-page">
      <div className="background"></div>
      <div className="content">
        <h1>Welcome to the Library Management Portal</h1>
        <p>
          This portal was created as a project for course work. Here you can manage books, readers, positions and payments.
          The portal is designed to facilitate the library's work and improve the reader experience.
        </p>
        <p>Developer: [zhbforum, killursxlf etc]</p>
      </div>
      <footer>
        <p>© 2024 Library Management Portal</p>
      </footer>
    </div>
  );
}

export default HomePage;
