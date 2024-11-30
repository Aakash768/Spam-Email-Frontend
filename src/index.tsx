import React from 'react';
import ReactDOM from 'react-dom/client';
import './globals.css';
import SpamDetection from './spam-detection';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <SpamDetection />
  </React.StrictMode>
);
