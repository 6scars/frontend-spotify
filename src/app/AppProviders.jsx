import { AuthProvider } from '../modules/Auth/AuthProvider.jsx'
import { CurrentPlaybackProvider } from '../modules/CurrentPlayback/CurrentPlaybackProvider.jsx'
import { LatestSongsProvider } from '../modules/LatestSongs/LatestSongsProvider.jsx'
import { PlayerProvider } from '../modules/Player/PlayerProvider.jsx'
import { ToastProvider } from '../modules/Toast/ToastProvider.jsx'
import { UIStateProvider } from '../modules/UIState/UIStateProvider.jsx'

export default function AppProviders({ children }) {
  return (
    <ToastProvider>
      <AuthProvider>
        <UIStateProvider>
          <CurrentPlaybackProvider>
            <LatestSongsProvider>
              <PlayerProvider>{children}</PlayerProvider>
            </LatestSongsProvider>
          </CurrentPlaybackProvider>
        </UIStateProvider>
      </AuthProvider>
    </ToastProvider>
  )
}
