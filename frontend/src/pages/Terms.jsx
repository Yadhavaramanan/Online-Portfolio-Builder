import React from 'react';

const Terms = () => {
  const styles = {
    termsContainer: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '2rem',
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      fontFamily: 'Arial, sans-serif',
      lineHeight: '1.6',
    },
    heading: {
      color: '#333',
      borderBottom: '2px solid #f0f0f0',
      paddingBottom: '10px',
      marginBottom: '20px',
      fontSize: '2rem',
    },
    sectionHeading: {
      color: '#444',
      marginTop: '30px',
      marginBottom: '15px',
      fontSize: '1.3rem',
    },
    paragraph: {
      margin: '15px 0',
      color: '#555',
    },
    list: {
      paddingLeft: '20px',
      margin: '10px 0',
    },
    nestedList: {
      paddingLeft: '20px',
      margin: '5px 0',
    },
    listItem: {
      margin: '8px 0',
    },
    contact: {
      marginTop: '30px',
      paddingTop: '15px',
      borderTop: '1px solid #f0f0f0',
    },
    emailHighlight: {
      color: '#0066cc',
      fontWeight: 'bold',
    },
    // Responsive styles
    '@media (max-width: 768px)': {
      termsContainer: {
        padding: '1.5rem',
        margin: '0 15px',
      },
      heading: {
        fontSize: '1.7rem',
      },
      sectionHeading: {
        fontSize: '1.2rem',
      },
    },
    '@media (max-width: 480px)': {
      termsContainer: {
        padding: '1rem',
        margin: '0 10px',
      },
      heading: {
        fontSize: '1.4rem',
      },
      sectionHeading: {
        fontSize: '1.1rem',
      },
      list: {
        paddingLeft: '15px',
      },
    }
  };

  // Apply responsive styles based on screen size
  const getResponsiveStyle = (baseStyle, styleName) => {
    const isMediumScreen = window.matchMedia('(max-width: 768px)').matches;
    const isSmallScreen = window.matchMedia('(max-width: 480px)').matches;

    if (isSmallScreen && styles['@media (max-width: 480px)'][styleName]) {
      return { ...baseStyle, ...styles['@media (max-width: 480px)'][styleName] };
    }

    if (isMediumScreen && styles['@media (max-width: 768px)'][styleName]) {
      return { ...baseStyle, ...styles['@media (max-width: 768px)'][styleName] };
    }

    return baseStyle;
  };

  return (
    <div style={getResponsiveStyle(styles.termsContainer, 'termsContainer')}>
      <h1 style={getResponsiveStyle(styles.heading, 'heading')}>Terms and Conditions</h1>
      <p style={styles.paragraph}>Welcome to our Online Portfolio Builder.</p>
      <p style={styles.paragraph}>By using our website, you agree to the following terms and conditions:</p>

      <h3 style={getResponsiveStyle(styles.sectionHeading, 'sectionHeading')}>1. Introduction</h3>
      <p style={styles.paragraph}>
        By using our platform, you agree to comply with and be bound by these Terms and Conditions.
        If you do not agree with any part of these terms, please do not use our services.
      </p>

      <h3 style={getResponsiveStyle(styles.sectionHeading, 'sectionHeading')}>2. Account and Registration</h3>
      <ul style={getResponsiveStyle(styles.list, 'list')}>
        <li style={styles.listItem}>You are responsible for maintaining the security of your account.</li>
        <li style={styles.listItem}>Providing false information may lead to account suspension.</li>
      </ul>

      <h3 style={getResponsiveStyle(styles.sectionHeading, 'sectionHeading')}>3. Use of Services</h3>
      <ul style={getResponsiveStyle(styles.list, 'list')}>
        <li style={styles.listItem}>Do not misuse our platform, including but not limited to:</li>
        <ul style={styles.nestedList}>
          <li style={styles.listItem}>Uploading illegal, offensive, or copyrighted content.</li>
          <li style={styles.listItem}>Attempting to hack or disrupt the service.</li>
          <li style={styles.listItem}>Using the platform for fraudulent purposes.</li>
        </ul>
      </ul>

      <h3 style={getResponsiveStyle(styles.sectionHeading, 'sectionHeading')}>4. Content Ownership and Rights</h3>
      <ul style={getResponsiveStyle(styles.list, 'list')}>
        <li style={styles.listItem}>By uploading content, you grant us a non-exclusive license to display your portfolio.</li>
        <li style={styles.listItem}>We may remove content that violates our policies or legal obligations.</li>
      </ul>

      <h3 style={getResponsiveStyle(styles.sectionHeading, 'sectionHeading')}>5. Limitation of Liability</h3>
      <ul style={getResponsiveStyle(styles.list, 'list')}>
        <li style={styles.listItem}>We are not liable for any loss of data or damages from platform use.</li>
        <li style={styles.listItem}>Users are responsible for backing up their data.</li>
      </ul>

      <h3 style={getResponsiveStyle(styles.sectionHeading, 'sectionHeading')}>6. Privacy and Changes</h3>
      <ul style={getResponsiveStyle(styles.list, 'list')}>
        <li style={styles.listItem}>We handle your data according to our Privacy Policy.</li>
        <li style={styles.listItem}>We may update these Terms at any time with notice.</li>
      </ul>

      <h3 style={getResponsiveStyle(styles.sectionHeading, 'sectionHeading')}>Contact Us</h3>
      <p style={styles.paragraph}>
        If you have questions, email us at <span style={styles.emailHighlight}>yadhavaramananyadhava@gmail.com</span>
      </p>
      <p style={styles.contact}>Thank you for using our services!</p>
      <button
        type="button"
        style={{
          padding: '12px 20px',
          backgroundColor: '#3f51b5',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '1rem',
          fontWeight: 'bold',
          marginTop: '25px',
          transition: 'background-color 0.3s'
        }}
        onClick={() => window.location.href = '/signup'}
        onMouseOver={(e) => e.target.style.backgroundColor = '#303f9f'}
        onMouseOut={(e) => e.target.style.backgroundColor = '#3f51b5'}
      >
        Return to Signup
      </button>
    </div>
  );
};

export default Terms;