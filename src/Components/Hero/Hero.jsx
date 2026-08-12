import React from 'react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import NetworkCanvas from './NetworkCanvas';
import './Hero.css';

const Hero = () => {
  return (
    <section id="home" className="hero">
      <NetworkCanvas />
      
      <div className="hero-container container">
        <div className="hero-content">
          <div className="hero-text-area">
            <p className="hero-subtitle">Hi!, I am</p>
            <h1 className="hero-title">
              <span className="name-highlight">Anshul Shukla.</span>
              <br />
              I like to explore my own limits
            </h1>
            <p className="hero-description">
              I am a Computer Science Engineer and I like to build things for the web. 
              I also dabble in AI and ML alongside learning new things. I am also very 
              passionate about cars and anything mechanical.
            </p>
            
            <div className="hero-cta">
              <a href="#projects" className="btn btn-primary">Check out my work</a>
              <a href="#contact" className="btn btn-outline">Get in touch</a>
            </div>

            <div className="hero-socials">
              <a href="https://github.com/anshul-lh44" target="_blank" rel="noreferrer" aria-label="GitHub">
                <FaGithub />
              </a>
              <a href="https://www.linkedin.com/in/anshul-shukla-6679b6332/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <FaLinkedin />
              </a>
              <a href="https://www.instagram.com/anshulshukla_07/?hl=en" target="_blank" rel="noreferrer" aria-label="Instagram">
                <FaInstagram />
              </a>
            </div>
          </div>
          
          <div className="hero-image-area">
            <div className="hero-image-wrapper">
              <img 
                src="/anshul-profile-cutout.png" 
                alt="Anshul Shukla Profile" 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
