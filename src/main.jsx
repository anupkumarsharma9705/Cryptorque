import React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from './race/ThemeProvider';
import App from './race/App';
import './race/tokens.css';
import './race/components.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
