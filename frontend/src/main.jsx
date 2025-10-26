import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import AddSong from './AddSong.jsx'




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/mini-spotify">
      <Routes>
        <Route path="/addSong" element={<AddSong />} />
        <Route path="/" element={<App />} />

      </Routes>
    </BrowserRouter>
  </StrictMode>
)
