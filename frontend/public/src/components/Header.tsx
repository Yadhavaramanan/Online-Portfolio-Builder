import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase } from 'lucide-react';
import '../styles/Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="container header-container">
        <Link to="/" className="logo">
          <Briefcase size={24} />
          <span>Portfolio Builder</span>
        </Link>
        <nav className="nav">
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/templates" className="nav-link">Templates</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;