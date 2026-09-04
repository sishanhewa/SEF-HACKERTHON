import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import Home from './pages/Home.jsx';
import RequestAid from './pages/RequestAid.jsx';

// Placeholders for future pages
const Dashboard = () => <div className="page container empty-state"><div className="empty-state-icon">📊</div><h2>Dashboard (Coming Soon)</h2></div>;
const Donate = () => <div className="page container empty-state"><div className="empty-state-icon">🤝</div><h2>Donate (Coming Soon)</h2></div>;
const Volunteer = () => <div className="page container empty-state"><div className="empty-state-icon">💪</div><h2>Volunteer (Coming Soon)</h2></div>;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="request-aid" element={<RequestAid />} />
          <Route path="donate" element={<Donate />} />
          <Route path="volunteer" element={<Volunteer />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
