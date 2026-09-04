import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content grid-2">
          <div className="footer-brand">
            <span className="brand-text">FloodAid<span className="brand-accent">SL</span></span>
            <p className="footer-tagline">Connecting victims, donors, and volunteers in Sri Lanka during natural disasters.</p>
          </div>
          <div className="footer-links">
            <div className="footer-section">
              <h4>Platform</h4>
              <ul>
                <li><a href="/dashboard">Dashboard</a></li>
                <li><a href="/request-aid">Request Aid</a></li>
                <li><a href="/donate">Donate</a></li>
                <li><a href="/volunteer">Volunteer</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Contact</h4>
              <p>Emergency: 117 (Disaster Management Center)</p>
              <p>Email: support@floodaidsl.lk</p>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} FloodAid SL. Created for SE3090 Mini Hackathon.</p>
        </div>
      </div>
    </footer>
  );
}
