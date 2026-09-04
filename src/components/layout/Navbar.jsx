import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const links = [
    { to: '/', label: 'Home', icon: '🏠' },
    { to: '/dashboard', label: 'Dashboard', icon: '📊' },
    { to: '/request-aid', label: 'Request Aid', icon: '🆘' },
    { to: '/donate', label: 'Donate', icon: '🤝' },
    { to: '/volunteer', label: 'Volunteer', icon: '💪' },
  ];

  return (
    <nav className="navbar" id="main-navbar">
      <div className="navbar-container container">
        <Link to="/" className="navbar-brand" id="nav-brand">
          <span className="brand-icon">🌊</span>
          <span className="brand-text">FloodAid<span className="brand-accent">SL</span></span>
        </Link>

        <button
          className={`navbar-toggle ${isOpen ? 'active' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
          id="nav-toggle"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`navbar-links ${isOpen ? 'open' : ''}`} id="nav-links">
          {links.map(link => (
            <li key={link.to}>
              <Link
                to={link.to}
                className={`nav-link ${location.pathname === link.to ? 'active' : ''}`}
                onClick={() => setIsOpen(false)}
                id={`nav-link-${link.label.toLowerCase().replace(/\s/g, '-')}`}
              >
                <span className="nav-icon">{link.icon}</span>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
