import React from 'react';
import { createRoot } from 'react-dom/client'; // Import de createRoot

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Utilisation de createRoot pour rendre l'application
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Reste du code inchangé
reportWebVitals();
