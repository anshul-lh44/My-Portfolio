import React from 'react';
import './Footer.css';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-socials">
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
        <p className="footer-text">
          Designed & Built with React <br />
          <span>&copy; {new Date().getFullYear()} Anshul Shukla. All rights reserved.</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
