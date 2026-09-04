import { PRIORITY_CONFIG, STATUS_CONFIG, CATEGORY_CONFIG, timeAgo } from '../../lib/helpers';
import './RequestCard.css';

export default function RequestCard({ request, onActionClick }) {
  const {
    id,
    district,
    location_description,
    category,
    item_description,
    quantity_needed,
    quantity_fulfilled,
    priority,
    status,
    created_at
  } = request;

  const priorityCfg = PRIORITY_CONFIG[priority] || PRIORITY_CONFIG.low;
  const statusCfg = STATUS_CONFIG[status] || STATUS_CONFIG.unfulfilled;
  const categoryCfg = CATEGORY_CONFIG[category] || CATEGORY_CONFIG.other;

  // Calculate fulfillment percentage
  const fulfillPct = quantity_needed > 0 
    ? Math.min(100, Math.round((quantity_fulfilled / quantity_needed) * 100)) 
    : 100;

  return (
    <div className={`request-card glass-card priority-${priority}`}>
      <div className="card-header">
        <div className="card-badges">
          <span className="badge" style={{ backgroundColor: priorityCfg.bg, color: priorityCfg.color }}>
            {priorityCfg.icon} {priorityCfg.label}
          </span>
          <span className="badge" style={{ backgroundColor: statusCfg.bg, color: statusCfg.color }}>
            {statusCfg.label}
          </span>
        </div>
        <div className="card-time">{timeAgo(created_at)}</div>
      </div>

      <div className="card-body">
        <div className="card-category">
          <span className="category-icon">{categoryCfg.icon}</span>
          <span className="category-name">{categoryCfg.label} Needed</span>
        </div>
        
        <h3 className="card-title">{item_description}</h3>
        
        <div className="card-location">
          <span className="icon">📍</span>
          <span><strong>{district}</strong> • {location_description}</span>
        </div>

        <div className="card-progress-container">
          <div className="progress-labels">
            <span>Progress</span>
            <span>{quantity_fulfilled} / {quantity_needed} units</span>
          </div>
          <div className="progress-bar-bg">
            <div 
              className="progress-bar-fill" 
              style={{ 
                width: `${fulfillPct}%`,
                backgroundColor: fulfillPct === 100 ? 'var(--accent-500)' : 'var(--primary-500)'
              }}
            ></div>
          </div>
        </div>
      </div>

      <div className="card-footer">
        <button 
          className="btn btn-primary card-action-btn"
          onClick={() => onActionClick(id)}
          disabled={status === 'fulfilled'}
        >
          {status === 'fulfilled' ? 'Fully Funded' : 'Donate to this request'}
        </button>
      </div>
    </div>
  );
}
