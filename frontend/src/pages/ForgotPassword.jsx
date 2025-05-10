import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Assuming you're using react-router
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Password reset link sent to your email');
        setEmail('');
      } else {
        setError(data.message || 'Failed to send reset email');
      }
    } catch (error) {
      console.error('Forgot Password Error:', error);
      setError('Server error. Please try again later.');
    }
  };

  const styles = {
    authContainer: {
      maxWidth: '400px',
      margin: '0 auto',
      padding: '2rem',
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center',
    },
    title: {
      color: '#333',
      marginBottom: '1.5rem',
      fontSize: '1.5rem',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
    },
    input: {
      padding: '12px',
      borderRadius: '4px',
      border: '1px solid #ddd',
      fontSize: '1rem',
      width: '100%',
      boxSizing: 'border-box',
    },
    button: {
      padding: '12px',
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '1rem',
      fontWeight: 'bold',
      transition: 'background-color 0.3s',
    },
    successMessage: {
      color: '#4CAF50',
      margin: '1rem 0',
      padding: '0.5rem',
      backgroundColor: 'rgba(76, 175, 80, 0.1)',
      borderRadius: '4px',
    },
    errorMessage: {
      color: '#f44336',
      margin: '1rem 0',
      padding: '0.5rem',
      backgroundColor: 'rgba(244, 67, 54, 0.1)',
      borderRadius: '4px',
    },
    '@media (max-width: 480px)': {
      authContainer: {
        width: '90%',
        padding: '1rem',
      },
      title: {
        fontSize: '1.25rem',
      },
      input: {
        padding: '10px',
      },
      button: {
        padding: '10px',
      },
    }
  };

  // Apply responsive styles for mobile
  const mediaQuery = window.matchMedia('(max-width: 480px)');
  const responsiveContainerStyle = mediaQuery.matches
    ? { ...styles.authContainer, ...styles['@media (max-width: 480px)'].authContainer }
    : styles.authContainer;

  const responsiveTitleStyle = mediaQuery.matches
    ? { ...styles.title, ...styles['@media (max-width: 480px)'].title }
    : styles.title;

  const responsiveInputStyle = mediaQuery.matches
    ? { ...styles.input, ...styles['@media (max-width: 480px)'].input }
    : styles.input;

  const responsiveButtonStyle = mediaQuery.matches
    ? { ...styles.button, ...styles['@media (max-width: 480px)'].button }
    : styles.button;

  return (
    <div style={responsiveContainerStyle}>
      <h2 style={responsiveTitleStyle}>Forgot Password</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={responsiveInputStyle}
        />
        <button
          type="submit"
          style={responsiveButtonStyle}
          onMouseOver={(e) => e.target.style.backgroundColor = '#45a049'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#4CAF50'}
        >
          Send Reset Link
        </button>
        <button
          type="button"
          style={{
            ...responsiveButtonStyle,
            backgroundColor: '#3f51b5', // Different color to distinguish it
            marginTop: '10px'          // Add some spacing between buttons
          }}
          onClick={() => navigate('/signin')} // Assuming you're using react-router
          onMouseOver={(e) => e.target.style.backgroundColor = '#303f9f'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#3f51b5'}
        >
          Return to Signup
        </button>
      </form>

      {message && <p style={styles.successMessage}>{message}</p>}
      {error && <p style={styles.errorMessage}>{error}</p>}
    </div>
  );
};

export default ForgotPassword;