import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content fade-in-up">
            <h1 className="hero-title">
              Sri Lanka Flood Relief <br/>
              <span className="text-gradient">Coordination Platform</span>
            </h1>
            <p className="hero-subtitle">
              Connecting victims in need with donors and volunteers. Real-time aid distribution and resource tracking to ensure help reaches where it's needed most.
            </p>
            <div className="hero-actions">
              <Link to="/request-aid" className="btn btn-primary btn-lg">
                <span className="icon">🆘</span> I Need Help
              </Link>
              <Link to="/donate" className="btn btn-accent btn-lg">
                <span className="icon">🤝</span> I Want to Donate
              </Link>
              <Link to="/volunteer" className="btn btn-outline btn-lg">
                <span className="icon">💪</span> Volunteer
              </Link>
            </div>
          </div>
        </div>
        <div className="hero-bg-effect"></div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid grid-4 fade-in">
            <div className="stat-card glass-card">
              <div className="stat-value text-gradient">8+</div>
              <div className="stat-label">Districts Affected</div>
            </div>
            <div className="stat-card glass-card">
              <div className="stat-value">145</div>
              <div className="stat-label">Active Aid Requests</div>
            </div>
            <div className="stat-card glass-card">
              <div className="stat-value text-accent">68%</div>
              <div className="stat-label">Requests Fulfilled</div>
            </div>
            <div className="stat-card glass-card">
              <div className="stat-value">320</div>
              <div className="stat-label">Active Volunteers</div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Definition Section (Hackathon Requirement #2) */}
      <section className="problem-section container fade-in-up">
        <div className="section-header text-center">
          <h2 className="section-title">The Challenge We're Solving</h2>
          <p className="section-subtitle">Why FloodAid SL was created</p>
        </div>
        
        <div className="problem-grid grid-2">
          <div className="problem-card glass-card">
            <div className="problem-icon">🌊</div>
            <h3>The Problem</h3>
            <p>During severe monsoon flooding in Sri Lanka, aid distribution becomes chaotic. Victims in hard-to-reach areas struggle to communicate their specific needs. Meanwhile, generous donors often provide items that aren't urgently required, leading to wasted resources while critical shortages remain unmet elsewhere.</p>
          </div>
          <div className="solution-card glass-card">
            <div className="solution-icon">💡</div>
            <h3>Our Solution</h3>
            <p>FloodAid SL is a real-time platform that maps verified aid requests against available donations and volunteer resources. By calculating exact resource gaps and assigning priority levels, we ensure the right aid reaches the right people at the right time — minimizing waste and maximizing impact.</p>
          </div>
        </div>
      </section>
      
      {/* Live Map Preview CTA */}
      <section className="map-cta-section container fade-in">
        <div className="map-cta-card glass-card text-center">
          <h2>See Real-Time Needs Across Sri Lanka</h2>
          <p>View our live map to see where help is needed most right now.</p>
          <Link to="/dashboard" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
            View Dashboard & Map
          </Link>
        </div>
      </section>
    </div>
  );
}
