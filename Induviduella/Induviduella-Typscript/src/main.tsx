import React from 'react';
import { createRoot } from 'react-dom/client'; // Import from react-dom/client
import App from './App.tsx';
import { Provider } from 'react-redux';
import { store } from './store/index.ts';
import './main.scss';

// Inside your main application file (e.g., App.js)

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
