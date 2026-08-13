import React, { useState, useEffect } from 'react';
import { FaHome, FaUser, FaCode, FaBriefcase, FaEnvelope, FaTimes, FaBars } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen && window.innerWidth <= 768) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [menuOpen]);

  const navLinks = [
    { name: 'Home', href: '#home', icon: <FaHome /> },
    { name: 'About', href: '#about', icon: <FaUser /> },
    { name: 'Skills', href: '#skills', icon: <FaCode /> },
    { name: 'Projects', href: '#projects', icon: <FaBriefcase /> },
    { name: 'Contact', href: '#contact', icon: <FaEnvelope /> },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    document.body.style.overflow = 'auto';
    const targetElement = document.querySelector(href);
    if (targetElement) {
      if (window.innerWidth <= 768) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      } else {
        targetElement.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
      }
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <a href="#home" className="logo" onClick={(e) => handleNavClick(e, '#home')}>
          A<span>S</span>.
        </a>

        <button 
          className={`menu-icon ${menuOpen ? 'open' : ''}`} 
          onClick={() => setMenuOpen(!menuOpen)} 
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <ul className={`nav-menu ${menuOpen ? 'active' : ''}`}>
          {navLinks.map((link, index) => (
            <li key={index} className="nav-item">
              <a 
                href={link.href} 
                className="nav-link"
                onClick={(e) => handleNavClick(e, link.href)}
              >
                <span className="nav-link-icon">{link.icon}</span>
                <span className="nav-link-text">{link.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
