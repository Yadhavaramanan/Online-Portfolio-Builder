import React from 'react';
import '../styles/templates/CreativeTemplate.css';

const CreativeTemplate = ({ data }) => {
  return (
    <div className="creative-template">
      <header className="creative-header">
        <div className="header-content">
          <h1 className="name">{data.name || 'Your Name'}</h1>
          <p className="title">{data.title || 'Your Professional Title'}</p>
          <div className="divider"></div>
          <p className="bio">{data.bio || 'Write your bio here...'}</p>
          
          <div className="contact-info">
            {data.email && <p>{data.email}</p>}
            {data.phone && <p>{data.phone}</p>}
            {data.location && <p>{data.location}</p>}
          </div>
        </div>
      </header>
      
      {data.skills && (
        <section className="creative-skills">
          <h2>My Skills</h2>
          <div className="skills-container">
            {data.skills.split(',').map((skill, index) => (
              <div key={index} className="skill-item">
                <span className="skill-name">{skill.trim()}</span>
              </div>
            ))}
          </div>
        </section>
      )}
      
      {data.projects && data.projects.length > 0 && (
        <section className="creative-projects">
          <h2>Featured Projects</h2>
          <div className="projects-grid">
            {data.projects.map((project, index) => (
              <div key={index} className="project-card">
                {project.imageUrl && (
                  <div className="project-image">
                    <img src={project.imageUrl} alt={project.title} />
                  </div>
                )}
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
        </section>
      )}
      
      <div className="creative-columns">
        <section className="creative-experience">
          <h2>Experience</h2>
          {data.experience && data.experience.map((exp, index) => (
            <div key={index} className="experience-item">
              <div className="timeline-dot"></div>
              <h3>{exp.position}</h3>
              <h4>{exp.company}</h4>
              <p className="duration">{exp.duration}</p>
              <p>{exp.description}</p>
            </div>
          ))}
        </section>
        
        <section className="creative-education">
          <h2>Education</h2>
          {data.education && data.education.map((edu, index) => (
            <div key={index} className="education-item">
              <div className="timeline-dot"></div>
              <h3>{edu.degree}</h3>
              <h4>{edu.institution}</h4>
              <p>{edu.year}</p>
            </div>
          ))}
        </section>
      </div>
      
      <footer className="creative-footer">
        <p>&copy; {new Date().getFullYear()} {data.name || 'Your Name'}</p>
      </footer>
    </div>
  );
};

export default CreativeTemplate;