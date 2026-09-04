import { SRI_LANKAN_DISTRICTS, CATEGORY_CONFIG, PRIORITY_CONFIG } from '../../lib/helpers';
import './FilterBar.css';

export default function FilterBar({ filters, onFilterChange }) {
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ ...filters, [name]: value });
  };

  const handleClear = () => {
    onFilterChange({
      search: '',
      district: '',
      category: '',
      priority: '',
      status: ''
    });
  };

  const hasActiveFilters = filters.district || filters.category || filters.priority || filters.status || filters.search;

  return (
    <div className="filter-bar glass-card">
      <div className="filter-header">
        <h3>Filters</h3>
        {hasActiveFilters && (
          <button className="btn-clear" onClick={handleClear}>Clear All</button>
        )}
      </div>

      <div className="filter-group">
        <label htmlFor="search" className="filter-label">Search</label>
        <input
          type="text"
          id="search"
          name="search"
          className="form-input filter-input"
          placeholder="Search items..."
          value={filters.search || ''}
          onChange={handleChange}
        />
      </div>

      <div className="filter-group">
        <label htmlFor="district-filter" className="filter-label">District</label>
        <select
          id="district-filter"
          name="district"
          className="form-select filter-select"
          value={filters.district || ''}
          onChange={handleChange}
        >
          <option value="">All Districts</option>
          {SRI_LANKAN_DISTRICTS.map(d => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="category-filter" className="filter-label">Category</label>
        <select
          id="category-filter"
          name="category"
          className="form-select filter-select"
          value={filters.category || ''}
          onChange={handleChange}
        >
          <option value="">All Categories</option>
          {Object.entries(CATEGORY_CONFIG).map(([key, config]) => (
            <option key={key} value={key}>{config.label}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="priority-filter" className="filter-label">Priority</label>
        <select
          id="priority-filter"
          name="priority"
          className="form-select filter-select"
          value={filters.priority || ''}
          onChange={handleChange}
        >
          <option value="">All Priorities</option>
          {Object.entries(PRIORITY_CONFIG).map(([key, config]) => (
            <option key={key} value={key}>{config.label}</option>
          ))}
        </select>
      </div>
      
      <div className="filter-group">
        <label htmlFor="status-filter" className="filter-label">Status</label>
        <select
          id="status-filter"
          name="status"
          className="form-select filter-select"
          value={filters.status || ''}
          onChange={handleChange}
        >
          <option value="">All Statuses</option>
          <option value="unfulfilled">Unfulfilled</option>
          <option value="partial">Partially Fulfilled</option>
          <option value="fulfilled">Fulfilled</option>
        </select>
      </div>
    </div>
  );
}
