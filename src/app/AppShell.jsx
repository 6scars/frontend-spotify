import { useLocation } from 'react-router-dom'

import { APP_ROUTES } from './routes.js'
import { useCurrentPlaybackContext } from '../modules/CurrentPlayback/useCurrentPlaybackContext.js'
import { useUIStateContext } from '../modules/UIState/useUIStateContext.js'
import { useCompactLayout } from '../shared/hooks/useCompactLayout.js'
import DescriptionDrawer from '../widgets/Center/DescriptionDrawer.jsx'
import './AppShell.css'

export default function AppShell({ sidebar, header, queue, player, overlay, children }) {
  const { pathname } = useLocation()
  const normalizedPath = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname
  const isImmersive = normalizedPath === APP_ROUTES.nowPlaying
  const { show } = useUIStateContext()
  const { currentSong } = useCurrentPlaybackContext()
  const compact = useCompactLayout()
  const detailsOpen = Boolean(show && currentSong && !isImmersive)

  return (
    <div className={`app-shell ${player ? 'app-shell--playing' : ''} ${isImmersive ? 'app-shell--immersive' : ''} ${detailsOpen ? 'app-shell--details-open' : ''}`}>
      <div className="app-shell__sidebar" inert={detailsOpen && compact}>{sidebar}</div>
      <div className="app-shell__workspace" inert={detailsOpen && compact}>
        {header}
        {children}
      </div>
      <DescriptionDrawer isOpen={detailsOpen} compact={compact} />
      {isImmersive ? null : queue}
      {player}
      {overlay}
    </div>
  )
}
