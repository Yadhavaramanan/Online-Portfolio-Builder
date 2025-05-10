import React from 'react';
import '../styles/Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} Portfolio Builder. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;