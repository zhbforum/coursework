import React from 'react';
import './Footer.css'; 

function Footer() 
{
  return (
    <footer className="footer">
      <div className="footer-logo">Library Management</div>
      <p>//TODO: Fixanyt` problemi s headerom v books, authors, readers, loans, payments, genres</p>
      <p>&copy; {new Date().getFullYear()} Library Management. Разработано: :</p>
    </footer>
  );
}

export default Footer;
