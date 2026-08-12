import React from 'react';
import './Skills.css';
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaGitAlt, FaPython, FaBrain, FaVideo, FaPalette, FaJava, FaAws } from 'react-icons/fa';
import { SiMongodb, SiCplusplus } from 'react-icons/si';
import WaterfallBackground from './WaterfallBackground';

const Skills = () => {
  const skillsList = [
    { name: 'C++', icon: <SiCplusplus />, color: '#00599C' },
    { name: 'Java', icon: <FaJava />, color: '#007396' },
    { name: 'Python', icon: <FaPython />, color: '#3776AB' },
    { name: 'HTML5', icon: <FaHtml5 />, color: '#E34F26' },
    { name: 'CSS3', icon: <FaCss3Alt />, color: '#1572B6' },
    { name: 'JavaScript', icon: <FaJs />, color: '#F7DF1E' },
    { name: 'React', icon: <FaReact />, color: '#61DAFB' },
    { name: 'Node.js', icon: <FaNodeJs />, color: '#339933' },
    { name: 'Cloud (AWS)', icon: <FaAws />, color: '#FF9900' },
    { name: 'AI & ML', icon: <FaBrain />, color: '#FF6F61' },
    { name: 'Graphic Design', icon: <FaPalette />, color: '#FF7700' },
    { name: 'Video Editing', icon: <FaVideo />, color: '#9933FF' },
    { name: 'MongoDB', icon: <SiMongodb />, color: '#47A248' },
    { name: 'Git', icon: <FaGitAlt />, color: '#F05032' },
  ];

  return (
    <section id="skills" className="skills-section">
      <WaterfallBackground />
      <div className="container">
        <h2 className="section-title">My Skills</h2>
        <div className="skills-container">
          {skillsList.map((skill, index) => (
            <div className="skill-card" key={index}>
              <div 
                className="skill-icon" 
                style={{"--hover-color": skill.color}}
              >
                {skill.icon}
              </div>
              <p className="skill-name">{skill.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
