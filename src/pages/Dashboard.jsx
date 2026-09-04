import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RequestCard from '../components/dashboard/RequestCard';
import FilterBar from '../components/dashboard/FilterBar';
import { sampleAidRequests, calculateDashboardStats } from '../lib/helpers'; // using sample data for UI phase
import './Dashboard.css';

export default function Dashboard() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [filters, setFilters] = useState({});
  const [stats, setStats] = useState(null);

  // Load sample data for UI phase (Step 5)
  // Real data fetching will happen in Step 6
  useEffect(() => {
    setRequests(sampleAidRequests);
    setStats(calculateDashboardStats(sampleAidRequests));
  }, []);

  // Apply filters
  const filteredRequests = requests.filter(req => {
    if (filters.district && req.district !== filters.district) return false;
    if (filters.category && req.category !== filters.category) return false;
    if (filters.priority && req.priority !== filters.priority) return false;
    if (filters.status && req.status !== filters.status) return false;
    if (filters.search && !req.item_description.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  });

  const handleActionClick = (requestId) => {
    // Navigate to donation page for specific request
    navigate(`/donate?request=${requestId}`);
  };

  return (
    <div className="page dashboard-page">
      <div className="container">
        
        {/* Dashboard Header & Stats Summary */}
        <div className="dashboard-header fade-in-up">
          <div className="header-title">
            <h1 className="section-title">Operations Dashboard</h1>
            <p className="section-subtitle">Real-time overview of aid requests and resource distribution</p>
          </div>
          
          {stats && (
            <div className="stats-summary glass-card">
              <div className="stat-mini">
                <span className="stat-mini-label">Total Requests</span>
                <span className="stat-mini-val">{stats.total}</span>
              </div>
              <div className="stat-mini">
                <span className="stat-mini-label">Critical</span>
                <span className="stat-mini-val text-danger">{stats.critical}</span>
              </div>
              <div className="stat-mini">
                <span className="stat-mini-label">Fulfilled</span>
                <span className="stat-mini-val text-success">{stats.fulfilled}</span>
              </div>
            </div>
          )}
        </div>

        {/* Dashboard Layout (Sidebar + Main) */}
        <div className="dashboard-layout fade-in">
          
          <aside className="dashboard-sidebar">
            <FilterBar filters={filters} onFilterChange={setFilters} />
          </aside>
          
          <div className="dashboard-main">
            <div className="results-meta">
              <span>Showing {filteredRequests.length} requests</span>
            </div>

            {filteredRequests.length > 0 ? (
              <div className="requests-grid">
                {filteredRequests.map(req => (
                  <RequestCard 
                    key={req.id} 
                    request={req} 
                    onActionClick={handleActionClick} 
                  />
                ))}
              </div>
            ) : (
              <div className="empty-state glass-card text-center">
                <div className="empty-state-icon" style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
                <h3>No requests found</h3>
                <p style={{ color: 'var(--text-secondary)' }}>Try adjusting your filters to see more results.</p>
                <button 
                  className="btn btn-outline" 
                  style={{ marginTop: '1rem' }}
                  onClick={() => setFilters({})}
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
}
