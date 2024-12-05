import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import './index.css'
import { NavidadApp } from './NavidadApp'

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <BrowserRouter>
      <NavidadApp />
    </BrowserRouter>    

  </StrictMode>,
)
