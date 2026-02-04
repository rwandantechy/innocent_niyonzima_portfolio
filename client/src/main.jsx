import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import ThemeProvider from './context/ThemeProvider';
import AppProvider from './context/AppProvider';
import './index.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
        <AppProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
        </AppProvider>
    </ThemeProvider>
  </React.StrictMode>
);
