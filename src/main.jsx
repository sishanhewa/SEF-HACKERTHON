import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import Home from './pages/Home.jsx';
import RequestAid from './pages/RequestAid.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Donate from './pages/Donate.jsx';
import Volunteer from './pages/Volunteer.jsx';
import VolunteersList from './pages/VolunteersList.jsx';
import VolunteerDashboard from './pages/VolunteerDashboard.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="request-aid" element={<RequestAid />} />
          <Route path="donate" element={<Donate />} />
          <Route path="volunteer-register" element={<Volunteer />} />
          <Route path="volunteers" element={<VolunteersList />} />
          <Route path="volunteer-dashboard/:id" element={<VolunteerDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
