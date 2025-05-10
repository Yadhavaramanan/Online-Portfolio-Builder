import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Briefcase, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import '../styles/Header.css';

const Header = () => {
  const { isAuthenticated, user, logout, loading } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Add shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container header-container">
        <Link to="/homepage" className="logo">
          <Briefcase size={24} />
          <span>Portfolio Builder</span>
        </Link>

        <button
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <nav className={`nav ${mobileMenuOpen ? 'active' : ''}`}>
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/homepage" className="nav-link">Home</Link>
            </li>

            {/* Loading authentication */}
            {loading ? (
              <li className="nav-item">
                <span className="nav-link">Checking...</span>
              </li>
            ) : isAuthenticated ? (
              <>
                <li className="nav-item">
                  <Link to="/dashboard" className="nav-link">Dashboard</Link>
                </li>
                <li className="nav-item">
                  <button onClick={handleLogout} className="logout-btn">
                    <span>Logout</span> <LogOut size={16} />
                  </button>
                </li>
                {user && (
                  <li className="nav-item">
                    <span className="nav-user">Hello, {user.username}</span>
                  </li>
                )}
              </>
            ) : (
              <li className="nav-item">
                <Link to="/signin" className="nav-link">Login</Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
