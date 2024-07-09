import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css'; // Assuming you have an index.css file for global styles

const container = document.getElementById('filmSearchRoot');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
