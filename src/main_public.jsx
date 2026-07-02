import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import CorporateHub from './PublicApp.jsx';

if (window.location.pathname.match(/^\/(access|login)/i)) {
  window.location.href = "/login/";
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CorporateHub />
  </StrictMode>
);
