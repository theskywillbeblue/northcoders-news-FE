import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router'
import App from './App.jsx'
import 'primereact/resources/themes/lara-light-cyan/theme.css'; 
import 'primereact/resources/primereact.min.css'; 

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <StrictMode>
    <App />
  </StrictMode>
  </BrowserRouter>,
)
