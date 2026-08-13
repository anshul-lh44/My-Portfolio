import React, { useState, useEffect } from 'react';
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
    } else if (window.innerWidth <= 768) {
      document.body.style.overflow = 'auto';
    }
  }, [menuOpen]);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e, href) => {
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
      <div className="navbar-container container">
        <a href="#home" className="logo" onClick={(e) => handleNavClick(e, '#home')}>
          A<span>S</span>.
        </a>

        <div className={`menu-icon ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation menu">
          <div className="bar1"></div>
          <div className="bar2"></div>
          <div className="bar3"></div>
        </div>

        <ul className={`nav-menu ${menuOpen ? 'active' : ''}`}>
          {navLinks.map((link, index) => (
            <li key={index} className="nav-item">
              <a 
                href={link.href} 
                className="nav-link"
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
