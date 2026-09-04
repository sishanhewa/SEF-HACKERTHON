import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AidRequestForm from '../components/forms/AidRequestForm';
import { createAidRequest } from '../lib/supabase';
import './RequestAid.css';

export default function RequestAid() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const navigate = useNavigate();
  
  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      // In a real app, we'd get lat/lng from a map picker. 
      // For now, we'll use a placeholder or null if not available.
      const requestData = {
        ...formData,
        // Status defaults to 'unfulfilled' in the DB
      };
      
      await createAidRequest(requestData);
      setSubmitSuccess(true);
      
      // Auto redirect to dashboard after 3 seconds
      setTimeout(() => {
        navigate('/dashboard');
      }, 3000);
      
    } catch (error) {
      console.error('Error submitting aid request:', error);
      setSubmitError('Failed to submit request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="page request-aid-page">
        <div className="container">
          <div className="form-container fade-in">
            <div className="glass-card text-center" style={{ padding: '4rem 2rem' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
              <h2>Request Submitted Successfully</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                Your request has been recorded and will be visible to donors and volunteers shortly.
              </p>
              <button className="btn btn-primary" onClick={() => navigate('/dashboard')}>
                View Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page request-aid-page">
      <div className="container">
        <div className="page-header fade-in-up">
          <h1 className="section-title">Request Aid</h1>
          <p className="section-subtitle">Submit a request for emergency assistance. Please provide accurate details so volunteers and donors can find you.</p>
        </div>

        <div className="form-container fade-in">
          <div className="guidance-panel glass-card">
            <h3><span className="icon">⚠️</span> Important Guidelines</h3>
            <ul>
              <li>Only submit requests for genuine emergencies related to natural disasters.</li>
              <li>Provide clear landmark details if roads are inaccessible.</li>
              <li>Consolidate requests for multiple families into a single submission if possible.</li>
              <li>The system will automatically assign priority based on the items you need.</li>
            </ul>
          </div>

          {submitError && (
            <div className="form-error" style={{ marginBottom: '1rem', padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: 'var(--radius-md)' }}>
              {submitError}
            </div>
          )}

          <AidRequestForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
        </div>
      </div>
    </div>
  );
}
