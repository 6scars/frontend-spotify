import { useLocation } from 'react-router-dom'

import { APP_ROUTES } from './routes.js'
import './AppShell.css'

export default function AppShell({ sidebar, header, queue, player, overlay, children }) {
  const { pathname } = useLocation()
  const normalizedPath = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname
  const isImmersive = normalizedPath === APP_ROUTES.nowPlaying

  return (
    <div className={`app-shell ${player ? 'app-shell--playing' : ''} ${isImmersive ? 'app-shell--immersive' : ''}`}>
      <div className="app-shell__sidebar">{sidebar}</div>
      <div className="app-shell__workspace">
        {header}
        {children}
      </div>
      <div className="app-shell__queue">{queue}</div>
      {player}
      {overlay}
    </div>
  )
}
