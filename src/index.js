import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import ThankYou from './pages/ThankYou';
import ContractorOnboarding from './pages/ContractorOnboarding';
import PropertyManagerOnboarding from './pages/PropertyManagerOnboarding';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/onboarding/contractor" element={<ContractorOnboarding />} />
        <Route path="/onboarding/property-manager" element={<PropertyManagerOnboarding />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
