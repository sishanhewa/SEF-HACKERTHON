import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { getAidRequestById } from '../lib/supabase';
import { CATEGORY_CONFIG } from '../lib/helpers';

export default function Donate() {
  const [searchParams] = useSearchParams();
  const requestId = searchParams.get('request');
  const navigate = useNavigate();
  
  const [requestDetails, setRequestDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(!!requestId);
  
  // Dummy form state for UI phase
  const [formData, setFormData] = useState({
    donor_name: '',
    item_description: '',
    quantity: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function fetchRequestDetails() {
      if (!requestId) return;
      try {
        const data = await getAidRequestById(requestId);
        setRequestDetails(data);
        // Pre-fill what we can
        setFormData(prev => ({
          ...prev,
          item_description: data.item_description,
          quantity: data.quantity_needed - data.quantity_fulfilled
        }));
      } catch (err) {
        console.error("Failed to load request details", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchRequestDetails();
  }, [requestId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // UI Phase dummy submit
    setTimeout(() => {
      alert('UI Phase: Donation recorded! Real submission will be added in the next step.');
      setIsSubmitting(false);
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="page donate-page">
      <div className="container">
        <div className="page-header fade-in-up">
          <h1 className="section-title">Make a Donation</h1>
          <p className="section-subtitle">
            Pledge to fulfill an aid request. Your contribution goes directly to those in need.
          </p>
        </div>

        <div className="form-container fade-in" style={{ maxWidth: '600px', margin: '0 auto' }}>
          
          {isLoading ? (
            <div className="text-center" style={{ padding: '2rem' }}>Loading request details...</div>
          ) : (
            <>
              {requestDetails ? (
                <div className="glass-card" style={{ marginBottom: '2rem', background: 'rgba(59, 130, 246, 0.05)', borderColor: 'rgba(59, 130, 246, 0.2)' }}>
                  <h3 style={{ fontSize: '1rem', color: 'var(--primary-400)', marginBottom: '0.5rem' }}>You are donating to:</h3>
                  <p style={{ fontWeight: '600', marginBottom: '0.25rem' }}>{requestDetails.item_description}</p>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    📍 {requestDetails.district} • {requestDetails.location_description}
                  </p>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                    <strong>Remaining needed:</strong> {requestDetails.quantity_needed - requestDetails.quantity_fulfilled} units
                  </p>
                </div>
              ) : (
                <div className="glass-card" style={{ marginBottom: '2rem', background: 'rgba(245, 158, 11, 0.05)', borderColor: 'rgba(245, 158, 11, 0.2)' }}>
                  <p style={{ color: 'var(--warning-500)', fontSize: '0.875rem' }}>
                    ⚠️ You haven't selected a specific request to donate to. 
                    We recommend <a href="/dashboard" style={{ textDecoration: 'underline' }}>visiting the dashboard</a> to select a specific need.
                  </p>
                </div>
              )}

              <form className="glass-card" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="donor_name" className="form-label">Your Name / Organization <span className="required">*</span></label>
                  <input
                    type="text"
                    id="donor_name"
                    name="donor_name"
                    className="form-input"
                    required
                    placeholder="e.g. Rotary Club Colombo"
                    value={formData.donor_name}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="item_description" className="form-label">What are you donating? <span className="required">*</span></label>
                  <input
                    type="text"
                    id="item_description"
                    name="item_description"
                    className="form-input"
                    required
                    placeholder="e.g. 5kg Rice Bags"
                    value={formData.item_description}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="quantity" className="form-label">Quantity <span className="required">*</span></label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    className="form-input"
                    required
                    min="1"
                    placeholder="e.g. 10"
                    value={formData.quantity}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-actions" style={{ marginTop: '2rem' }}>
                  <button type="submit" className="btn btn-accent btn-lg" style={{ width: '100%' }} disabled={isSubmitting}>
                    {isSubmitting ? 'Processing...' : 'Confirm Pledge'}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
