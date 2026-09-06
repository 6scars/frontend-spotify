import CreatePlaylist from './CreatePlaylist/CreatePlaylist.jsx'
import { useUIStateContext } from '../../modules/UIState/useUIStateContext.js'
import { useAuthContext } from '../../modules/Auth/useAuthContext.js'
import './Center.css'

export default function Center({ children }) {
  const { showCreatePlaylistWindow } = useUIStateContext()
  const { songs } = useAuthContext()

  return (
    <main className="Center">
      <div className="music center-primary red-scroll-bar">
        {showCreatePlaylistWindow ? <CreatePlaylist songs={songs} /> : children}
      </div>
    </main>
  )
}
