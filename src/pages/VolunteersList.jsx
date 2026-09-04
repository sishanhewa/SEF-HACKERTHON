import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getVolunteers } from '../lib/supabase';
import { User, MapPin, Clock, Wrench, Phone } from 'lucide-react';
import { SRI_LANKAN_DISTRICTS } from '../lib/helpers';

export default function VolunteersList() {
  const [volunteers, setVolunteers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [districtFilter, setDistrictFilter] = useState('');

  useEffect(() => {
    async function fetchVolunteers() {
      setIsLoading(true);
      try {
        const data = await getVolunteers(districtFilter ? { district: districtFilter } : {});
        setVolunteers(data);
      } catch (error) {
        console.error("Failed to fetch volunteers:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchVolunteers();
  }, [districtFilter]);

  return (
    <div className="page volunteers-page">
      <div className="container">
        <div className="page-header fade-in-up" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 className="section-title">Volunteers</h1>
            <p className="section-subtitle">
              People offering their time and skills to help with disaster relief.
            </p>
          </div>
          <Link to="/volunteer-register" className="btn btn-primary">
            Register as Volunteer
          </Link>
        </div>

        <div className="filters-section glass-card fade-in" style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <label htmlFor="district-filter" style={{ fontWeight: 500 }}>Filter by District:</label>
          <select 
            id="district-filter" 
            className="form-select" 
            style={{ maxWidth: '250px' }}
            value={districtFilter}
            onChange={(e) => setDistrictFilter(e.target.value)}
          >
            <option value="">All Districts</option>
            {SRI_LANKAN_DISTRICTS.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        {isLoading ? (
          <div className="text-center" style={{ padding: '3rem' }}>Loading volunteers...</div>
        ) : volunteers.length === 0 ? (
          <div className="glass-card text-center" style={{ padding: '3rem' }}>
            <p style={{ color: 'var(--text-secondary)' }}>No volunteers found in this area.</p>
          </div>
        ) : (
          <div className="grid-3">
            {volunteers.map(volunteer => (
              <div key={volunteer.id} className="glass-card fade-in-up">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-600)' }}>
                    <User size={20} />
                  </div>
                  <h3 style={{ fontSize: '1.1rem', margin: 0 }}>{volunteer.volunteer_name}</h3>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem' }}>
                  {volunteer.contact_phone && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                      <Phone size={16} /> <a href={`tel:${volunteer.contact_phone}`} style={{ color: 'var(--accent-500)', textDecoration: 'none' }}>{volunteer.contact_phone}</a>
                    </div>
                  )}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                    <MapPin size={16} /> <span>{volunteer.district}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                    <Clock size={16} /> <span style={{ textTransform: 'capitalize' }}>{volunteer.availability.replace('-', ' ')}</span>
                  </div>
                  {volunteer.skills && (
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                      <Wrench size={16} style={{ flexShrink: 0, marginTop: '2px' }} /> 
                      <span>{volunteer.skills}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
