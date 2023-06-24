import React from 'react';
import ReactDOM from 'react-dom/client';
import { DiskProvider } from './contexts/DiskContext';
import App from './App';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <DiskProvider>
      <App />
    </DiskProvider>
  </React.StrictMode>
);
