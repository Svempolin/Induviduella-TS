import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Inside your main application file (e.g., App.js)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />

  </React.StrictMode>,
)
