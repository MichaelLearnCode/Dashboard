import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { initHotjar } from "./lib/hotjar";
import './index.css'
import App from './App.tsx'

initHotjar();
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
