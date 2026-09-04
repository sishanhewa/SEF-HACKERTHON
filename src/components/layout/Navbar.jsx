import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BarChart2, LifeBuoy, HeartHandshake, UserPlus, Waves } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const links = [
    { to: '/', label: 'Home', icon: <Home size={18} /> },
    { to: '/dashboard', label: 'Dashboard', icon: <BarChart2 size={18} /> },
    { to: '/request-aid', label: 'Request Aid', icon: <LifeBuoy size={18} /> },
    { to: '/donate', label: 'Donate', icon: <HeartHandshake size={18} /> },
    { to: '/volunteer', label: 'Volunteer', icon: <UserPlus size={18} /> },
  ];

  return (
    <nav className="navbar" id="main-navbar">
      <div className="navbar-container container">
        <Link to="/" className="navbar-brand" id="nav-brand">
          <Waves size={24} className="brand-icon" style={{ color: 'var(--primary-500)', marginRight: '8px' }} />
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
                <span className="nav-icon" style={{ display: 'flex', alignItems: 'center' }}>{link.icon}</span>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
