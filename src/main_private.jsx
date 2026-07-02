import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import CorporateHubApp from './PrivateApp.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CorporateHubApp />
  </StrictMode>
);
