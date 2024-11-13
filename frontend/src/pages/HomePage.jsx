import React from 'react';
import './HomePage.css';

function HomePage() 
{
  const backgroundStyle = 
{
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: 'url("/startback.png")', 
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    filter: 'brightness(0.5)', 
    zIndex: 0,
};

  return (
    <div className="home-page">
      <div style={backgroundStyle}></div>
      <div className="content">
        <h1>Welcome to the Library Management Portal</h1>
        <p>
          This portal was created as a project for course work. Here you can manage books, readers, positions and payments.
          The portal is designed to facilitate the library's work and improve the reader experience.
        </p>
        <p>Developer: [//TODO: ebanyt suda imya ]</p>
      </div>
    </div>
  );
}

export default HomePage;
