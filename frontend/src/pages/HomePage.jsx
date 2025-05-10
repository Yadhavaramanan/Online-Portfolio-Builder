import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import '../styles/HomePage.css';

const HomePage = () => {
  const { user, isAuthenticated, loading } = useAuth();

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          {/* Display personalized welcome if user is logged in */}
          {!loading && isAuthenticated && user && (
            <div className="welcome-banner">
              <User size={20} />
              <h2>Welcome back, {user.username}!</h2>
            </div>
          )}
          <h1>Create Your Professional Portfolio in Minutes</h1>
          <p>Showcase your work, skills, and achievements with a customized online portfolio</p>
          
          {/* Conditionally show different CTA based on auth status */}
          {!loading && isAuthenticated ? (
            <Link to="/dashboard" className="btn">
              Go to Dashboard <ArrowRight size={16} className="icon" />
            </Link>
          ) : (
            <Link to="/templates" className="btn">
              Get Started <ArrowRight size={16} className="icon" />
            </Link>
          )}
        </div>
        <div className="hero-image">
          <img 
            src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
            alt="Portfolio showcase" 
          />
        </div>
      </section>

      <section className="features-section">
        <h2 className="section-title">Why Choose Our Portfolio Builder?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Professional Templates</h3>
            <p>Choose from a variety of professionally designed templates to showcase your work.</p>
          </div>
          <div className="feature-card">
            <h3>Easy Customization</h3>
            <p>Personalize your portfolio with our intuitive customization tools.</p>
          </div>
          <div className="feature-card">
            <h3>Cloud Hosting</h3>
            <p>Your portfolio is securely hosted in the cloud for easy sharing and management.</p>
          </div>
          <div className="feature-card">
            <h3>Mobile Responsive</h3>
            <p>Your portfolio looks great on all devices, from desktops to smartphones.</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to Showcase Your Work?</h2>
        <p>Create your professional portfolio today and stand out from the crowd.</p>
        
        {/* Conditionally show different CTA based on auth status */}
        {!loading && isAuthenticated ? (
          <Link to="/templates" className="btn">Start Building Now</Link>
        ) : (
          <Link to="/templates" className="btn">Start Building Now</Link>
        )}
      </section>
    </div>
  );
};

export default HomePage;