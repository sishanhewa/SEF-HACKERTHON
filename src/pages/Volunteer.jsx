import { useState } from 'react';
import { PartyPopper, Info } from 'lucide-react';
import { SRI_LANKAN_DISTRICTS } from '../lib/helpers';
import { createVolunteer } from '../lib/supabase';
import { validateVolunteer } from '../lib/validation';

export default function Volunteer() {
  const [formData, setFormData] = useState({
    volunteer_name: '',
    contact_phone: '',
    district: '',
    availability: '',
    skills: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError(null);

    const { isValid, errors: validationErrors } = validateVolunteer(formData);
    
    if (!isValid) {
      setErrors(validationErrors);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);
    
    try {
      await createVolunteer(formData);
      setSubmitSuccess(true);
    } catch (error) {
      console.error("Failed to register volunteer:", error);
      setServerError("Failed to register. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="page volunteer-page">
        <div className="container">
          <div className="form-container fade-in" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <div className="glass-card text-center" style={{ padding: '4rem 2rem' }}>
              <PartyPopper size={64} style={{ color: 'var(--accent-500)', margin: '0 auto 1.5rem', display: 'block' }} />
              <h2>Thank You for Registering!</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                Your details have been recorded. Coordinators in your district will contact you when help is needed.
              </p>
              <a href="/dashboard" className="btn btn-primary">
                Return to Dashboard
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page volunteer-page">
      <div className="container">
        <div className="page-header fade-in-up">
          <h1 className="section-title">Register as a Volunteer</h1>
          <p className="section-subtitle">
            Offer your time and skills to help distribute aid and assist flood victims on the ground.
          </p>
        </div>

        <div className="form-container fade-in" style={{ maxWidth: '600px', margin: '0 auto' }}>
          
          <div className="guidance-panel glass-card" style={{ marginBottom: '2rem', background: 'rgba(16, 185, 129, 0.05)', borderColor: 'rgba(16, 185, 129, 0.2)' }}>
            <h3 style={{ color: 'var(--accent-500)', fontSize: '1rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Info size={18} /> Why volunteer?
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              Logistics and manpower are often the biggest bottlenecks in disaster relief. By registering, you help organizations coordinate delivery routes and on-ground support safely and efficiently.
            </p>
          </div>

          {serverError && (
            <div className="form-error" style={{ marginBottom: '1rem', padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: 'var(--radius-md)' }}>
              {serverError}
            </div>
          )}

          <form className="glass-card" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="volunteer_name" className="form-label">Full Name <span className="required">*</span></label>
              <input
                type="text"
                id="volunteer_name"
                name="volunteer_name"
                className={`form-input ${errors.volunteer_name ? 'error' : ''}`}
                placeholder="e.g. Kasun Silva"
                value={formData.volunteer_name}
                onChange={handleChange}
              />
              {errors.volunteer_name && <div className="form-error" style={{ color: 'var(--danger-500)', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.volunteer_name}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="contact_phone" className="form-label">Contact Number</label>
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
              {errors.contact_phone && <div className="form-error" style={{ color: 'var(--danger-500)', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.contact_phone}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="district" className="form-label">District you can operate in <span className="required">*</span></label>
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
              {errors.district && <div className="form-error" style={{ color: 'var(--danger-500)', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.district}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="availability" className="form-label">Availability <span className="required">*</span></label>
              <select
                id="availability"
                name="availability"
                className={`form-select ${errors.availability ? 'error' : ''}`}
                value={formData.availability}
                onChange={handleChange}
              >
                <option value="">-- Select Availability --</option>
                <option value="available">Immediate (Available right now)</option>
                <option value="weekends">Weekends only</option>
                <option value="evenings">Evenings only</option>
                <option value="on-call">On-call standby</option>
              </select>
              {errors.availability && <div className="form-error" style={{ color: 'var(--danger-500)', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.availability}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="skills" className="form-label">Special Skills / Resources</label>
              <textarea
                id="skills"
                name="skills"
                className="form-textarea"
                placeholder="e.g. I have a 4WD vehicle, Medical training, Heavy lifting, Boat owner"
                rows="3"
                value={formData.skills}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="form-actions" style={{ marginTop: '2rem' }}>
              <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }} disabled={isSubmitting}>
                {isSubmitting ? 'Registering...' : 'Register to Help'}
              </button>
            </div>
          </form>
          
        </div>
      </div>
    </div>
  );
}
