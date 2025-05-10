import React from 'react';
import '../styles/templates/PortfolioTemplate.css';

const PortfolioTemplate = ({ data }) => {
  return (
    <div className="portfolio-template">
      <header className="portfolio-header">
        <nav className="portfolio-nav">
          <div className="logo">{data.name ? data.name.charAt(0) : 'P'}</div>
          <ul className="nav-links">
            <li><a href="#about">About</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#experience">Experience</a></li>
            <li><a href="#education">Education</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
        
        <div className="hero-section">
          <div className="hero-content">
            <h1>{data.name || 'Your Name'}</h1>
            <h2>{data.title || 'Your Professional Title'}</h2>
            <p>{data.bio || 'Write your bio here...'}</p>
            <a href="#projects" className="cta-button">View My Work</a>
          </div>
        </div>
      </header>
      
      <section id="about" className="about-section">
        <div className="container">
          <h2 className="section-title">About Me</h2>
          <div className="about-content">
            <div className="about-text">
              <p>{data.bio || 'Write your bio here...'}</p>
              
              {data.skills && (
                <div className="skills-container">
                  <h3>My Skills</h3>
                  <div className="skills-grid">
                    {data.skills.split(',').map((skill, index) => (
                      <div key={index} className="skill-item">
                        {skill.trim()}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {data.projects && data.projects.length > 0 && (
        <section id="projects" className="projects-section">
          <div className="container">
            <h2 className="section-title">My Projects</h2>
            <div className="projects-grid">
              {data.projects.map((project, index) => (
                <div key={index} className="project-card">
                  <div className="project-image">
                    {project.imageUrl ? (
                      <img src={project.imageUrl} alt={project.title} />
                    ) : (
                      <div className="placeholder-image"></div>
                    )}
                  </div>
                  <div className="project-details">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
                        View Project
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      
      {data.experience && data.experience.length > 0 && (
        <section id="experience" className="experience-section">
          <div className="container">
            <h2 className="section-title">Work Experience</h2>
            <div className="timeline">
              {data.experience.map((exp, index) => (
                <div key={index} className="timeline-item">
                  <div className="timeline-content">
                    <span className="date">{exp.duration}</span>
                    <h3>{exp.position}</h3>
                    <h4>{exp.company}</h4>
                    <p>{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      
      {data.education && data.education.length > 0 && (
        <section id="education" className="education-section">
          <div className="container">
            <h2 className="section-title">Education</h2>
            <div className="education-grid">
              {data.education.map((edu, index) => (
                <div key={index} className="education-card">
                  <div className="education-icon">
                    <span>{edu.institution ? edu.institution.charAt(0) : 'U'}</span>
                  </div>
                  <div className="education-details">
                    <h3>{edu.degree}</h3>
                    <h4>{edu.institution}</h4>
                    <p>{edu.year}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      
      <section id="contact" className="contact-section">
        <div className="container">
          <h2 className="section-title">Get In Touch</h2>
          <div className="contact-content">
            <div className="contact-info">
              {data.email && (
                <div className="contact-item">
                  <h3>Email</h3>
                  <p>{data.email}</p>
                </div>
              )}
              
              {data.phone && (
                <div className="contact-item">
                  <h3>Phone</h3>
                  <p>{data.phone}</p>
                </div>
              )}
              
              {data.location && (
                <div className="contact-item">
                  <h3>Location</h3>
                  <p>{data.location}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      <footer className="portfolio-footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} {data.name || 'Your Name'}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default PortfolioTemplate;