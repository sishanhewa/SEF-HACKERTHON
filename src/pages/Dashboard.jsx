import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RequestCard from '../components/dashboard/RequestCard';
import FilterBar from '../components/dashboard/FilterBar';
import LiveMap from '../components/dashboard/LiveMap';
import { calculateDashboardStats } from '../lib/helpers';
import { getAidRequests } from '../lib/supabase';
import './Dashboard.css';

export default function Dashboard() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [filters, setFilters] = useState({});
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from Supabase
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        // We fetch everything once for the map and client-side filter
        // In a huge app, we'd filter on the server
        const data = await getAidRequests();
        setRequests(data);
        setFilteredRequests(data);
        setStats(calculateDashboardStats(data));
      } catch (err) {
        console.error("Failed to fetch requests", err);
        setError("Failed to load dashboard data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchData();
  }, []);

  // Apply filters client-side
  useEffect(() => {
    let result = requests;
    
    if (filters.district) result = result.filter(req => req.district === filters.district);
    if (filters.category) result = result.filter(req => req.category === filters.category);
    if (filters.priority) result = result.filter(req => req.priority === filters.priority);
    if (filters.status) result = result.filter(req => req.status === filters.status);
    if (filters.search) result = result.filter(req => req.item_description.toLowerCase().includes(filters.search.toLowerCase()));
    
    setFilteredRequests(result);
  }, [filters, requests]);

  const handleActionClick = (requestId) => {
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
          
          {stats && !isLoading && (
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

        {error && (
          <div className="form-error" style={{ marginBottom: '2rem', padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: 'var(--radius-md)' }}>
            {error}
          </div>
        )}

        {/* Live Map */}
        {!isLoading && !error && (
          <div className="fade-in-up" style={{ animationDelay: '0.1s' }}>
            <LiveMap requests={filteredRequests} />
          </div>
        )}

        {/* Dashboard Layout (Sidebar + Main) */}
        <div className="dashboard-layout fade-in" style={{ animationDelay: '0.2s' }}>
          
          <aside className="dashboard-sidebar">
            <FilterBar filters={filters} onFilterChange={setFilters} />
          </aside>
          
          <div className="dashboard-main">
            <div className="results-meta">
              <span>Showing {filteredRequests.length} requests</span>
            </div>

            {isLoading ? (
              <div className="text-center" style={{ padding: '4rem', color: 'var(--text-secondary)' }}>
                Loading data from database...
              </div>
            ) : filteredRequests.length > 0 ? (
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
