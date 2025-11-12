import { StrictMode, useState, } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import AddSong from './AddSong.jsx'

import { AuthProvider } from "./contexts/AuthContext.jsx";
import { UIStateProvider } from "./contexts/UIStateContext.jsx";
import { CurrentPlaybackProvider } from "./contexts/CurrentPlaybackContext.jsx";
import { LatestSongsProvider } from "./contexts/LatestSongsContext.jsx";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/mini-spotify">





      <AuthProvider>
        <UIStateProvider>
          <CurrentPlaybackProvider>
            <LatestSongsProvider>
              <Routes>
                <Route path="/addSong" element={<AddSong />} />
                <Route path="/" element={<App />} />
              </Routes>
            </LatestSongsProvider>
          </CurrentPlaybackProvider>
        </UIStateProvider>
      </AuthProvider>







    </BrowserRouter>
  </StrictMode>
)
