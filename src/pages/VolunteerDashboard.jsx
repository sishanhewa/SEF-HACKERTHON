import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getVolunteerById, getAidRequests } from '../lib/supabase';
import { User, MapPin, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function VolunteerDashboard() {
  const { id } = useParams();
  const [volunteer, setVolunteer] = useState(null);
  const [districtRequests, setDistrictRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchDashboardData() {
      setIsLoading(true);
      try {
        // 1. Fetch volunteer details
        const volunteerData = await getVolunteerById(id);
        setVolunteer(volunteerData);
        
        // 2. Fetch active aid requests in their district
        const requests = await getAidRequests({ district: volunteerData.district });
        const activeRequests = requests.filter(r => r.status !== 'fulfilled');
        setDistrictRequests(activeRequests);
        
      } catch (err) {
        console.error("Dashboard error:", err);
        setError("Could not load volunteer dashboard. Please check your URL.");
      } finally {
        setIsLoading(false);
      }
    }
    
    if (id) {
      fetchDashboardData();
    }
  }, [id]);

  if (isLoading) {
    return <div className="page"><div className="container text-center" style={{ padding: '4rem' }}>Loading dashboard...</div></div>;
  }

  if (error || !volunteer) {
    return (
      <div className="page">
        <div className="container text-center" style={{ padding: '4rem' }}>
          <div className="glass-card fade-in">
            <h2 style={{ color: 'var(--danger-500)', marginBottom: '1rem' }}>Dashboard Not Found</h2>
            <p>{error || 'Invalid volunteer ID.'}</p>
            <Link to="/volunteers" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>View All Volunteers</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page volunteer-dashboard-page">
      <div className="container">
        
        <div className="glass-card fade-in-up" style={{ marginBottom: '2rem', background: 'var(--primary-900)', color: 'white', border: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldCheck size={32} />
            </div>
            <div>
              <h1 style={{ fontSize: '1.75rem', margin: '0 0 0.5rem 0', color: 'white' }}>Welcome, {volunteer.volunteer_name}!</h1>
              <p style={{ margin: 0, opacity: 0.9, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={16} /> District Coordinator: {volunteer.district}
              </p>
              <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', fontSize: '0.875rem' }}>
                <span style={{ background: 'rgba(255,255,255,0.1)', padding: '0.25rem 0.75rem', borderRadius: '1rem' }}>
                  Availability: <strong style={{ textTransform: 'capitalize' }}>{volunteer.availability.replace('-', ' ')}</strong>
                </span>
                <span style={{ background: 'rgba(255,255,255,0.1)', padding: '0.25rem 0.75rem', borderRadius: '1rem' }}>
                  ID: {volunteer.id.split('-')[0]}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-content grid-2" style={{ gridTemplateColumns: '1fr' }}>
          <div className="glass-card fade-in-up" style={{ animationDelay: '0.1s' }}>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <AlertTriangle size={20} color="var(--warning-500)" />
              Active Emergencies in {volunteer.district}
            </h2>
            
            {districtRequests.length === 0 ? (
              <p style={{ color: 'var(--text-secondary)' }}>No active requests in your district right now.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {districtRequests.map(req => (
                  <div key={req.id} style={{ padding: '1rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', background: 'rgba(255,255,255,0.5)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                      <h4 style={{ margin: 0 }}>{req.item_description}</h4>
                      <span className="badge" style={{ background: req.priority === 'critical' ? 'var(--danger-500)' : 'var(--warning-500)', color: 'white', padding: '0.1rem 0.5rem', fontSize: '0.75rem', borderRadius: '1rem' }}>
                        {req.priority.toUpperCase()}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: '0 0 0.5rem 0' }}>
                      <strong>Location:</strong> {req.location_description}
                    </p>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: 0 }}>
                      <strong>Needed:</strong> {req.quantity_needed - req.quantity_fulfilled} units
                    </p>
                  </div>
                ))}
              </div>
            )}
            
            <div style={{ marginTop: '2rem' }}>
              <Link to="/dashboard" className="btn btn-secondary" style={{ width: '100%', textAlign: 'center' }}>
                Go to Main Dashboard for More Details
              </Link>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
