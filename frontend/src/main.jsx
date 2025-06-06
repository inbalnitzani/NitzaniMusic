import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'react-tooltip/dist/react-tooltip.css'
import App from './App.jsx'

import 'primereact/resources/themes/bootstrap4-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
