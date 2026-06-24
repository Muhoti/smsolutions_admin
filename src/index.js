import React from 'react';
import ReactDOM from 'react-dom/client';
import { suppressResizeObserverLoop } from './utils/suppressResizeObserverLoop';
import './index.css';
import App from './App';

suppressResizeObserverLoop();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
