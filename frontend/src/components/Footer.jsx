import React from 'react';
import './Footer.css'; 

function Footer() 
{
  return (
    <footer className="footer">
      <div className="footer-logo">Library Management</div>
      <p>&copy; {new Date().getFullYear()} Library Management. Developer: zhbforum :</p>
    </footer>
  );
}

export default Footer;
