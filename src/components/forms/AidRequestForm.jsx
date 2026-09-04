import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { SRI_LANKAN_DISTRICTS, CATEGORY_CONFIG, calculatePriority, PRIORITY_CONFIG } from '../../lib/helpers';
import { validateAidRequest } from '../../lib/validation';
import './AidRequestForm.css';

// Fix for default marker icons in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function LocationPicker({ position, setPosition }) {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });
  return position ? <Marker position={position} /> : null;
}

export default function AidRequestForm({ onSubmit, initialData = null, isSubmitting = false }) {
  const [formData, setFormData] = useState({
    victim_name: '',
    contact_phone: '',
    district: '',
    location_description: '',
    latitude: '',
    longitude: '',
    category: '',
    item_description: '',
    quantity_needed: '',
  });

  const [priority, setPriority] = useState('low');
  const [errors, setErrors] = useState({});
  const centerSriLanka = [7.8731, 80.7718];

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  // Update priority preview dynamically when category or quantity changes
  useEffect(() => {
    if (formData.category && formData.quantity_needed) {
      setPriority(calculatePriority(formData.category, parseInt(formData.quantity_needed) || 0));
    }
  }, [formData.category, formData.quantity_needed]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleMapClick = (latlng) => {
    setFormData((prev) => ({
      ...prev,
      latitude: latlng.lat,
      longitude: latlng.lng
    }));
    if (errors.coordinates) {
      setErrors((prev) => ({ ...prev, coordinates: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    const { isValid, errors: validationErrors } = validateAidRequest(formData);
    
    if (!isValid) {
      setErrors(validationErrors);
      // Scroll to first error (simple implementation)
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (onSubmit) {
      // Include calculated priority
      onSubmit({
        ...formData,
        priority: calculatePriority(formData.category, parseInt(formData.quantity_needed)),
        quantity_needed: parseInt(formData.quantity_needed)
      });
    }
  };

  const priorityConfig = PRIORITY_CONFIG[priority] || PRIORITY_CONFIG.low;

  return (
    <form className="aid-request-form glass-card" onSubmit={handleSubmit}>
      <div className="form-section">
        <h3 className="section-heading">Contact Details</h3>
        
        <div className="grid-2">
          <div className="form-group">
            <label htmlFor="victim_name" className="form-label">Full Name <span className="required">*</span></label>
            <input
              type="text"
              id="victim_name"
              name="victim_name"
              className={`form-input ${errors.victim_name ? 'error' : ''}`}
              placeholder="e.g. Nimal Perera"
              value={formData.victim_name}
              onChange={handleChange}
            />
            {errors.victim_name && <div className="form-error">{errors.victim_name}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="contact_phone" className="form-label">Contact Number <span className="required">*</span></label>
            <input
              type="tel"
              id="contact_phone"
              name="contact_phone"
              maxLength="10"
              className={`form-input ${errors.contact_phone ? 'error' : ''}`}
              placeholder="0771234567"
              value={formData.contact_phone}
              onChange={handleChange}
            />
            {errors.contact_phone && <div className="form-error">{errors.contact_phone}</div>}
          </div>
        </div>
      </div>

      <div className="form-divider"></div>

      <div className="form-section">
        <h3 className="section-heading">Location</h3>
        
        <div className="form-group">
          <label htmlFor="district" className="form-label">District <span className="required">*</span></label>
          <select
            id="district"
            name="district"
            className={`form-select ${errors.district ? 'error' : ''}`}
            value={formData.district}
            onChange={handleChange}
          >
            <option value="">-- Select District --</option>
            {SRI_LANKAN_DISTRICTS.map((district) => (
              <option key={district} value={district}>{district}</option>
            ))}
          </select>
          {errors.district && <div className="form-error">{errors.district}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="location_description" className="form-label">Specific Location / Address <span className="required">*</span></label>
          <textarea
            id="location_description"
            name="location_description"
            className={`form-textarea ${errors.location_description ? 'error' : ''}`}
            placeholder="e.g. Near Kalutara Bodhiya, Temple Road (Include any landmarks if roads are flooded)"
            value={formData.location_description}
            onChange={handleChange}
            rows="3"
          ></textarea>
          {errors.location_description && <div className="form-error">{errors.location_description}</div>}
        </div>

        <div className="form-group">
          <label className="form-label">Pin Location on Map <span className="required">*</span></label>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Click on the map to place a pin at your exact location.</p>
          <div style={{ height: '300px', width: '100%', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: errors.coordinates ? '2px solid var(--danger-500)' : '1px solid var(--border-color)' }}>
            <MapContainer center={centerSriLanka} zoom={7} style={{ height: '100%', width: '100%' }}>
              <TileLayer
                attribution='&copy; OpenStreetMap'
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
              />
              <LocationPicker 
                position={formData.latitude && formData.longitude ? [formData.latitude, formData.longitude] : null} 
                setPosition={handleMapClick} 
              />
            </MapContainer>
          </div>
          {errors.coordinates && <div className="form-error" style={{ marginTop: '0.5rem' }}>{errors.coordinates}</div>}
        </div>
      </div>

      <div className="form-divider"></div>

      <div className="form-section">
        <h3 className="section-heading">Aid Required</h3>
        
        <div className="grid-2">
          <div className="form-group">
            <label htmlFor="category" className="form-label">Category <span className="required">*</span></label>
            <select
              id="category"
              name="category"
              className={`form-select ${errors.category ? 'error' : ''}`}
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">-- Select Category --</option>
              {Object.entries(CATEGORY_CONFIG).map(([key, config]) => (
                <option key={key} value={key}>{config.label}</option>
              ))}
            </select>
            {errors.category && <div className="form-error">{errors.category}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="quantity_needed" className="form-label">Quantity Needed <span className="required">*</span></label>
            <input
              type="number"
              id="quantity_needed"
              name="quantity_needed"
              min="1"
              max="10000"
              className={`form-input ${errors.quantity_needed ? 'error' : ''}`}
              placeholder="e.g. 50"
              value={formData.quantity_needed}
              onChange={handleChange}
            />
            {errors.quantity_needed && <div className="form-error">{errors.quantity_needed}</div>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="item_description" className="form-label">Detailed Description <span className="required">*</span></label>
          <textarea
            id="item_description"
            name="item_description"
            className={`form-textarea ${errors.item_description ? 'error' : ''}`}
            placeholder="e.g. Dry rations for 15 families (Rice, Dhal, Canned fish)"
            value={formData.item_description}
            onChange={handleChange}
            rows="3"
          ></textarea>
          {errors.item_description && <div className="form-error">{errors.item_description}</div>}
        </div>

        {/* Priority Preview Panel */}
        {(formData.category && formData.quantity_needed) && (
          <div className="priority-preview fade-in" style={{ borderColor: priorityConfig.color }}>
            <div className="priority-header">
              <span className="priority-label">System Priority Assignment:</span>
              <span className="badge" style={{ backgroundColor: priorityConfig.bg, color: priorityConfig.color }}>
                {priorityConfig.icon} {priorityConfig.label}
              </span>
            </div>
            <p className="priority-explainer">
              Priority is calculated automatically based on the life-critical nature of the category ({CATEGORY_CONFIG[formData.category]?.label}) and the quantity needed.
            </p>
          </div>
        )}
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary btn-lg submit-btn" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Aid Request'}
        </button>
      </div>
    </form>
  );
}
