import React from 'react'
import ReactDOM from 'react-dom/client'
import { MainPage } from './Pages/index.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MainPage />
  </React.StrictMode>,
)
