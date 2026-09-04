import AidRequestForm from '../components/forms/AidRequestForm';
import './RequestAid.css';

export default function RequestAid() {
  
  // Dummy submit handler for UI phase
  const handleSubmit = (formData) => {
    console.log('Form data to submit:', formData);
    alert('UI Phase: Form data captured. Backend submission will be added in Step 4.');
  };

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

          <AidRequestForm onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
}
