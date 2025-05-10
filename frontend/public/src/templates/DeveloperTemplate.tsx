import React from 'react';
import '../styles/templates/DeveloperTemplate.css';

interface TemplateProps {
  data: any;
}

const DeveloperTemplate: React.FC<TemplateProps> = ({ data }) => {
  return (
    <div className="developer-template">
      <header className="developer-header">
        <div className="terminal-window">
          <div className="terminal-header">
            <div className="terminal-buttons">
              <span className="terminal-button red"></span>
              <span className="terminal-button yellow"></span>
              <span className="terminal-button green"></span>
            </div>
            <div className="terminal-title">portfolio.sh</div>
          </div>
          <div className="terminal-body">
            <div className="terminal-line">
              <span className="prompt">$</span> whoami
            </div>
            <div className="terminal-output name">{data.name || 'Your Name'}</div>
            
            <div className="terminal-line">
              <span className="prompt">$</span> cat title.txt
            </div>
            <div className="terminal-output title">{data.title || 'Your Professional Title'}</div>
            
            <div className="terminal-line">
              <span className="prompt">$</span> cat bio.md
            </div>
            <div className="terminal-output bio">{data.bio || 'Write your bio here...'}</div>
            
            <div className="terminal-line">
              <span className="prompt">$</span> contact --info
            </div>
            <div className="terminal-output contact">
              {data.email && <div>Email: {data.email}</div>}
              {data.phone && <div>Phone: {data.phone}</div>}
              {data.location && <div>Location: {data.location}</div>}
            </div>
            
            {data.skills && (
              <>
                <div className="terminal-line">
                  <span className="prompt">$</span> list --skills
                </div>
                <div className="terminal-output skills">
                  {data.skills.split(',').map((skill: string, index: number) => (
                    <span key={index} className="skill-tag">{skill.trim()}</span>
                  ))}
                </div>
              </>
            )}
            
            <div className="terminal-line">
              <span className="prompt">$</span> <span className="cursor"></span>
            </div>
          </div>
        </div>
      </header>
      
      <main className="developer-main">
        {data.projects && data.projects.length > 0 && (
          <section className="projects-section">
            <h2>&lt;Projects /&gt;</h2>
            <div className="projects-grid">
              {data.projects.map((project: any, index: number) => (
                <div key={index} className="project-card">
                  <div className="project-header">
                    <h3>{project.title}</h3>
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
                        View
                      </a>
                    )}
                  </div>
                  {project.imageUrl && (
                    <div className="project-image">
                      <img src={project.imageUrl} alt={project.title} />
                    </div>
                  )}
                  <div className="project-description">
                    <p>{project.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
        
        {data.experience && data.experience.length > 0 && (
          <section className="experience-section">
            <h2>&lt;Experience /&gt;</h2>
            <div className="experience-timeline">
              {data.experience.map((exp: any, index: number) => (
                <div key={index} className="experience-item">
                  <div className="experience-metadata">
                    <span className="duration">{exp.duration}</span>
                  </div>
                  <div className="experience-content">
                    <h3>{exp.position}</h3>
                    <h4>{exp.company}</h4>
                    <p>{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
        
        {data.education && data.education.length > 0 && (
          <section className="education-section">
            <h2>&lt;Education /&gt;</h2>
            <div className="education-list">
              {data.education.map((edu: any, index: number) => (
                <div key={index} className="education-item">
                  <div className="education-year">{edu.year}</div>
                  <div className="education-details">
                    <h3>{edu.degree}</h3>
                    <h4>{edu.institution}</h4>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
      
      <footer className="developer-footer">
        <div className="footer-content">
          <div className="copyright">
            &copy; {new Date().getFullYear()} {data.name || 'Your Name'}
          </div>
          <div className="footer-message">
            Built with React.js and ❤️
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DeveloperTemplate;