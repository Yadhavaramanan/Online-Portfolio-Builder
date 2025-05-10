import React from 'react';
import '../styles/templates/ProfessionalTemplate.css';

interface TemplateProps {
  data: any;
}

const ProfessionalTemplate: React.FC<TemplateProps> = ({ data }) => {
  return (
    <div className="professional-template">
      <header className="professional-header">
        <div className="header-container">
          <div className="header-content">
            <h1>{data.name || 'Your Name'}</h1>
            <h2>{data.title || 'Your Professional Title'}</h2>
            <div className="contact-info">
              {data.email && <p><strong>Email:</strong> {data.email}</p>}
              {data.phone && <p><strong>Phone:</strong> {data.phone}</p>}
              {data.location && <p><strong>Location:</strong> {data.location}</p>}
            </div>
          </div>
        </div>
      </header>
      
      <main className="professional-main">
        <section className="about-section">
          <div className="section-container">
            <h3 className="section-title">About Me</h3>
            <p>{data.bio || 'Write your bio here...'}</p>
          </div>
        </section>
        
        {data.skills && (
          <section className="skills-section">
            <div className="section-container">
              <h3 className="section-title">Skills</h3>
              <div className="skills-grid">
                {data.skills.split(',').map((skill: string, index: number) => (
                  <div key={index} className="skill-item">
                    {skill.trim()}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
        
        {data.experience && data.experience.length > 0 && (
          <section className="experience-section">
            <div className="section-container">
              <h3 className="section-title">Professional Experience</h3>
              {data.experience.map((exp: any, index: number) => (
                <div key={index} className="experience-item">
                  <div className="experience-header">
                    <div>
                      <h4>{exp.position}</h4>
                      <h5>{exp.company}</h5>
                    </div>
                    <span className="duration">{exp.duration}</span>
                  </div>
                  <p>{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}
        
        {data.education && data.education.length > 0 && (
          <section className="education-section">
            <div className="section-container">
              <h3 className="section-title">Education</h3>
              <div className="education-grid">
                {data.education.map((edu: any, index: number) => (
                  <div key={index} className="education-item">
                    <h4>{edu.degree}</h4>
                    <h5>{edu.institution}</h5>
                    <p>{edu.year}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
        
        {data.projects && data.projects.length > 0 && (
          <section className="projects-section">
            <div className="section-container">
              <h3 className="section-title">Projects</h3>
              <div className="projects-grid">
                {data.projects.map((project: any, index: number) => (
                  <div key={index} className="project-item">
                    {project.imageUrl && (
                      <div className="project-image">
                        <img src={project.imageUrl} alt={project.title} />
                      </div>
                    )}
                    <div className="project-content">
                      <h4>{project.title}</h4>
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
      </main>
      
      <footer className="professional-footer">
        <div className="footer-container">
          <p>&copy; {new Date().getFullYear()} {data.name || 'Your Name'}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default ProfessionalTemplate;