import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

// Vérification des variables d'environnement en développement
if (import.meta.env.DEV) {
  console.log('🚀 Application en mode développement');
  console.log('📡 API Base URL:', import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api');
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)