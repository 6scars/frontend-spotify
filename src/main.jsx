import { StrictMode }                       from 'react'
import { createRoot }                       from 'react-dom/client'
import { BrowserRouter, Routes, Route }     from 'react-router-dom'


import App              from './App.jsx'
import AddSong          from './widgets/AddSong/AddSong.jsx'



import { AuthProvider }                     from "./modules/Auth/AuthProvider.jsx";
import { UIStateProvider }                  from "./modules/UIState/UIStateProvider.jsx";
import { CurrentPlaybackProvider }          from "./modules/CurrentPlayback/CurrentPlaybackProvider.jsx";
import { LatestSongsProvider }              from "./modules/LatestSongs/LatestSongsProvider.jsx";
import { PlayerProvider }                   from './modules/Player/PlayerProvider.jsx';
import { ToastProvider }                    from './modules/Toast/ToastProvider.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ToastProvider >
        <AuthProvider>
          <UIStateProvider>
            <CurrentPlaybackProvider>
              <LatestSongsProvider>
                  <PlayerProvider>
                    <Routes>
                      <Route path="/addSong" element={<AddSong />} />
                      <Route path="/" element={<App />} />
                    </Routes>
                  </PlayerProvider>
              </LatestSongsProvider>
            </CurrentPlaybackProvider>
          </UIStateProvider>
        </AuthProvider>
      </ToastProvider >
    </BrowserRouter>
  </StrictMode>
)
