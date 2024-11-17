import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-logo">
        <img 
          src={require('./logo.png')} 
          alt="Library Logo" 
          className="footer-logo-image"
        />
        Library Management
      </div>
      <p>&copy; {new Date().getFullYear()} Library Management. Developers: zhbforum, killursxlf</p>
    </footer>
  );
}

export default Footer;
