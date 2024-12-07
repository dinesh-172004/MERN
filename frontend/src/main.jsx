import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx'
// import App from './pages/Login.jsx'
// import App from './pages/create_emp.jsx'
// import App from './pages/navigation.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
