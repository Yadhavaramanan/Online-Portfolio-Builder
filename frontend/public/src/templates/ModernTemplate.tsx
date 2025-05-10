import React from 'react';
import '../styles/templates/ModernTemplate.css';

interface TemplateProps {
  data: any;
}

const ModernTemplate: React.FC<TemplateProps> = ({ data }) => {
  return (
    <div className="modern-template">
      <div className="sidebar">
        <div className="sidebar-content">
          <div className="profile-section">
            <h1>{data.name || 'Your Name'}</h1>
            <p className="title">{data.title || 'Your Professional Title'}</p>
          </div>
          
          <div className="contact-section">
            <h2>Contact</h2>
            <ul className="contact-list">
              {data.email && <li><strong>Email:</strong> {data.email}</li>}
              {data.phone && <li><strong>Phone:</strong> {data.phone}</li>}
              {data.location && <li><strong>Location:</strong> {data.location}</li>}
            </ul>
          </div>
          
          {data.skills && (
            <div className="skills-section">
              <h2>Skills</h2>
              <div className="skills-list">
                {data.skills.split(',').map((skill: string, index: number) => (
                  <span key={index} className="skill-tag">{skill.trim()}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="main-content">
        <section className="about-section">
          <h2>About Me</h2>
          <p>{data.bio || 'Write your bio here...'}</p>
        </section>
        
        {data.experience && data.experience.length > 0 && (
          <section className="experience-section">
            <h2>Experience</h2>
            {data.experience.map((exp: any, index: number) => (
              <div key={index} className="experience-item">
                <div className="experience-header">
                  <h3>{exp.position}</h3>
                  <span className="duration">{exp.duration}</span>
                </div>
                <p className="company">{exp.company}</p>
                <p className="description">{exp.description}</p>
              </div>
            ))}
          </section>
        )}
        
        {data.education && data.education.length > 0 && (
          <section className="education-section">
            <h2>Education</h2>
            {data.education.map((edu: any, index: number) => (
              <div key={index} className="education-item">
                <div className="education-header">
                  <h3>{edu.degree}</h3>
                  <span className="year">{edu.year}</span>
                </div>
                <p className="institution">{edu.institution}</p>
              </div>
            ))}
          </section>
        )}
        
        {data.projects && data.projects.length > 0 && (
          <section className="projects-section">
            <h2>Projects</h2>
            <div className="projects-grid">
              {data.projects.map((project: any, index: number) => (
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
          </section>
        )}
      </div>
    </div>
  );
};

export default ModernTemplate;