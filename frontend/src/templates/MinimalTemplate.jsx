import React from 'react';
import '../styles/templates/MinimalTemplate.css';

const MinimalTemplate = ({ data }) => {
  return (
    <div className="minimal-template">
      <header className="minimal-header">
        <div className="container">
          <h1>{data.name || 'Your Name'}</h1>
          <p className="title">{data.title || 'Your Professional Title'}</p>
        </div>
      </header>
      
      <section className="minimal-about">
        <div className="container">
          <h2>About Me</h2>
          <p>{data.bio || 'Write your bio here...'}</p>
          
          <div className="minimal-contact">
            {data.email && <p><strong>Email:</strong> {data.email}</p>}
            {data.phone && <p><strong>Phone:</strong> {data.phone}</p>}
            {data.location && <p><strong>Location:</strong> {data.location}</p>}
          </div>
        </div>
      </section>
      
      {data.skills && (
        <section className="minimal-skills">
          <div className="container">
            <h2>Skills</h2>
            <div className="skills-list">
              {data.skills.split(',').map((skill, index) => (
                <span key={index} className="skill-tag">{skill.trim()}</span>
              ))}
            </div>
          </div>
        </section>
      )}
      
      {data.experience && data.experience.length > 0 && (
        <section className="minimal-experience">
          <div className="container">
            <h2>Experience</h2>
            {data.experience.map((exp, index) => (
              <div key={index} className="experience-item">
                <div className="experience-header">
                  <h3>{exp.position}</h3>
                  <p className="company">{exp.company}</p>
                  <p className="duration">{exp.duration}</p>
                </div>
                <p className="description">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}
      
      {data.education && data.education.length > 0 && (
        <section className="minimal-education">
          <div className="container">
            <h2>Education</h2>
            {data.education.map((edu, index) => (
              <div key={index} className="education-item">
                <h3>{edu.degree}</h3>
                <p className="institution">{edu.institution}</p>
                <p className="year">{edu.year}</p>
              </div>
            ))}
          </div>
        </section>
      )}
      
      {data.projects && data.projects.length > 0 && (
        <section className="minimal-projects">
          <div className="container">
            <h2>Projects</h2>
            <div className="projects-grid">
              {data.projects.map((project, index) => (
                <div key={index} className="project-item">
                  {project.imageUrl && (
                    <div className="project-image">
                      <img src={project.imageUrl} alt={project.title} />
                    </div>
                  )}
                  <div className="project-content">
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
      
      <footer className="minimal-footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} {data.name || 'Your Name'}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default MinimalTemplate;