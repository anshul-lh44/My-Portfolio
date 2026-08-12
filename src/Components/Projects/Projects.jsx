import React from 'react';
import './Projects.css';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import CursorVortex from './CursorVortex';

const Projects = () => {
  const projectList = [
    {
      title: 'Watervation Waterfootprint Calculator',
      description: 'Developed code in C++ and Python to calculate the average water usage of a person and generate a comprehensive water footprint report. Partnered with fellow students to build a web platform integrating backend calculations with an interactive frontend interface.',
      tech: ['Python', 'C++', 'HTML', 'CSS', 'JavaScript'],
      github: 'https://github.com/anshul-lh44/Water-FootprintCalculator'
    },
    {
      title: 'Emocare AI Chatbot',
      description: 'Fine-tuned a Large Language Model (LLM) using Hugging Face to analyze user emotions and deliver empathetic psychological guidance. Designed to support individuals through emotionally challenging times and empower psychiatrists to monitor and assist patients remotely.',
      tech: ['Python', 'Hugging Face', 'JavaScript', 'HTML', 'CSS']
    },
    {
      title: 'Wifi Vulnerability Scanner',
      description: 'A web application designed to scan local networks within a target range, analyze active ports and IP addresses, and evaluate network security levels. Built as an experimental personal WiFi security tool for threat detection.',
      tech: ['Python', 'Kali Linux', 'FastAPI', 'Node.js']
    },
    {
      title: 'NevUp AI Intern Projects',
      description: 'Worked as a backend intern at NevUp AI. Contributed to fine-tuning and training Reinforcement Learning (RL) models, building a functional Chrome Extension, and implementing user onboarding integrations.',
      tech: ['Python', 'MongoDB', 'Flask', 'FastAPI', 'React', 'Node.js'],
      github: 'https://github.com/anshul-lh44/NevUp-Chrome-Extension'
    }
  ];

  return (
    <section id="projects" className="projects-section">
      <CursorVortex />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <h2 className="section-title">Some Things I've Built</h2>
        <div className="projects-grid">
          {projectList.map((project, index) => (
            <div className="project-card" key={index}>
              <div className="project-content">
                <p className="project-overline">Featured Project</p>
                <h3 className="project-title">{project.title}</h3>
                <div className="project-description">
                  <p>{project.description}</p>
                </div>
                <ul className="project-tech-list">
                  {project.tech.map((tech, i) => (
                    <li key={i}>{tech}</li>
                  ))}
                </ul>
                {(project.github || project.live) && (
                  <div className="project-links">
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noreferrer" aria-label="GitHub Link">
                        <FaGithub />
                      </a>
                    )}
                    {project.live && (
                      <a href={project.live} target="_blank" rel="noreferrer" aria-label="Live Demo Link">
                        <FaExternalLinkAlt />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
