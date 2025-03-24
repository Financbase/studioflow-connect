import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import App from './App.tsx'
// import TestApp from './TestApp.tsx'
import './index.css'
import "./styles/themes.css"
import "./styles/typography.css"

// Use the main application now that we've confirmed React rendering works
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
